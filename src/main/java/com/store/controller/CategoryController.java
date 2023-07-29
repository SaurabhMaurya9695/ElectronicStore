package com.store.controller;

import java.io.IOException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.store.dto.CategoryDto;
import com.store.dto.PageableResponse;
import com.store.dto.ProductDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.responsemsg.ImageResponse;
import com.store.service.CategoryService;
import com.store.service.FileService;
import com.store.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@Autowired
	private ProductService productService;

	@Autowired
	private FileService fileService;

	@Value("${categories.profile.image.path}")
	private String imagePathForcat;

	private Logger logger = LoggerFactory.getLogger(CategoryController.class);

	// create categoryy
	@Operation(summary = "Careat Category EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCat(@Valid @RequestBody CategoryDto data) {

		CategoryDto savedCat = this.categoryService.createCat(data);
		return new ResponseEntity<CategoryDto>(savedCat, HttpStatus.CREATED);
	}

	// getSingleCat
	@Operation(summary = " get the category  EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryDto> getSingleCat(@PathVariable String categoryId) {
		CategoryDto singleCat = this.categoryService.getSingleCat(categoryId);
		return new ResponseEntity<CategoryDto>(singleCat, HttpStatus.OK);
	}

	// getAllCat
	@Operation(summary = "Get All category EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping()
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageableResponse<CategoryDto>> getAllUser(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		PageableResponse<CategoryDto> allCat = this.categoryService.getAllCat(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<CategoryDto>>(allCat, HttpStatus.OK);
	}

	// updateCat
	@Operation(summary = "Update Category details of catId EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping("/{categoryId}")
	public ResponseEntity<?> updateCat(@Valid @RequestBody CategoryDto data, @PathVariable String categoryId) {
		CategoryDto updatedCat = this.categoryService.updatedCat(data, categoryId);
		return new ResponseEntity<CategoryDto>(updatedCat, HttpStatus.ACCEPTED);
	}

	// delete cat;
	@Operation(summary = "Delete category endpoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })

	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{categoryId}")
	public ResponseEntity<ApiResponseMessage> deleteCat(@PathVariable String categoryId) {
		this.categoryService.deleteCat(categoryId);
		ApiResponseMessage resp = new ApiResponseMessage();
		resp.setCode(HttpStatus.OK);
		resp.setMessage("category Deleted Successfully!!..");
		resp.setSuccess(true);

		return new ResponseEntity<ApiResponseMessage>(resp, resp.getCode());
	}

	// UploadImage
	@Operation(summary = "Upload the category image EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PostMapping("/image/{categoryId}")
	public ResponseEntity<ImageResponse> uploadImage(@RequestParam("image") MultipartFile file,
			@PathVariable String categoryId) throws IOException {
		String imgName = this.fileService.uploadFiles(file, imagePathForcat);
		String updatedName = imgName.substring(imgName.lastIndexOf("/") + 1);

		logger.error("Cover Image Name is : {} ,", updatedName);

		// file uploded in cate folders -> now we have to set this file for cat also
		CategoryDto cat = this.categoryService.getSingleCat(categoryId);
		cat.setCoverImage(updatedName);

		// now we have to update cat with previous one
		@SuppressWarnings("unused")
		CategoryDto updatedCat = this.categoryService.updatedCat(cat, categoryId);

		ImageResponse imageResponse = new ImageResponse();
		imageResponse.setImageName(updatedName);
		imageResponse.setMessage("File uploaded Sucessfully");
		imageResponse.setCode(HttpStatus.CREATED);
		imageResponse.setSuccess(true);
		return new ResponseEntity<ImageResponse>(imageResponse, HttpStatus.CREATED);
	}

	// Serve Image
	@Operation(summary = "Serve the category image EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping("/image/{categoryId}")
	public void serveImage(@PathVariable String categoryId, HttpServletResponse response) throws IOException {

		CategoryDto categoryData = this.categoryService.getSingleCat(categoryId);
		logger.info("User Image name is : {}", categoryData.getCoverImage());
		String ImgName = categoryData.getCoverImage();
		InputStream inputStream = this.fileService.getResource(imagePathForcat, ImgName);
		// we get the data in form of InputStream;
		// for that we have to send in response via HttpServletResponse -> output ;
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		// now we have to send the response
		StreamUtils.copy(inputStream, response.getOutputStream());

	}

	// insert in category of particular category product
	@Operation(summary = "update Category of Product  EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PutMapping("/{categoryId}/product/{pId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> updateCategoryofProduct(@PathVariable String categoryId, @PathVariable String pId) {
		ProductDto productDto = this.productService.updateCategory(pId, categoryId);
		return new ResponseEntity<ProductDto>(productDto, HttpStatus.OK);
	}

	// getProduct of categories
	@Operation(summary = "get All Products Of Category EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping("/{categoryId}/products")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<PageableResponse<ProductDto>> getAllProductsOfCategory(@PathVariable String categoryId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		PageableResponse<ProductDto> x = this.productService.getAllProductOfCategoryId(categoryId, pageNumber, pageSize,
				sortBy, sortDir);

		return new ResponseEntity<PageableResponse<ProductDto>>(x, HttpStatus.OK);
	}

}
