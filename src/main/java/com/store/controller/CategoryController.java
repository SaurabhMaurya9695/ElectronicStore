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

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/categories")
@CrossOrigin
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
	@PostMapping("/")
	public ResponseEntity<CategoryDto> createCat(@Valid @RequestBody CategoryDto data) {

		CategoryDto savedCat = this.categoryService.createCat(data);
		return new ResponseEntity<CategoryDto>(savedCat, HttpStatus.CREATED);
	}

	// getSingleCat
	@GetMapping("/{categoryId}")
	public ResponseEntity<CategoryDto> getSingleCat(@PathVariable String categoryId) {
		CategoryDto singleCat = this.categoryService.getSingleCat(categoryId);
		return new ResponseEntity<CategoryDto>(singleCat, HttpStatus.OK);
	}

	// getAllCat
	@GetMapping()
	public ResponseEntity<PageableResponse<CategoryDto>> getAllUser(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {

		PageableResponse<CategoryDto> allCat = this.categoryService.getAllCat(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<CategoryDto>>(allCat, HttpStatus.OK);
	}

	// updateCat
	@PutMapping("/{categoryId}")
	public ResponseEntity<?> updateCat(@Valid @RequestBody CategoryDto data, @PathVariable String categoryId) {
		CategoryDto updatedCat = this.categoryService.updatedCat(data, categoryId);
		return new ResponseEntity<CategoryDto>(updatedCat, HttpStatus.ACCEPTED);
	}

	// delete cat;
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

	//insert in category of particular category product
	@PutMapping("/{categoryId}/product/{pId}")
	public ResponseEntity<?> updateCategoryofProduct(@PathVariable String categoryId, @PathVariable String pId) {
		ProductDto productDto = this.productService.updateCategory(pId, categoryId);
		return new ResponseEntity<ProductDto>(productDto, HttpStatus.OK);
	}
	
	
	//getProduct of categories 
	@GetMapping("/{categoryId}/products")
	public ResponseEntity<PageableResponse<ProductDto>> getAllProductsOfCategory(
			@PathVariable String categoryId,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		
		PageableResponse<ProductDto> x = this.productService.getAllProductOfCategoryId(categoryId, pageNumber, pageSize, sortBy, sortDir);
		
		return new ResponseEntity<PageableResponse<ProductDto>>(x, HttpStatus.OK);
	}
	

}
