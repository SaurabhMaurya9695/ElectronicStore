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
import com.store.dto.PageableResponse;
import com.store.dto.ProductDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.responsemsg.ImageResponse;
import com.store.service.FileService;
import com.store.service.ProductService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/products")
public class ProductController {

	@Autowired
	private ProductService productService;
	
	@Autowired
	private FileService fileService;
	
	
	@Value("${products.profile.image.path}")
	private String productImagePath;
	
	private Logger logger = LoggerFactory.getLogger(ProductController.class);
	
	// create 
	@PostMapping("/")
	public ResponseEntity<?> createProduct(@RequestBody ProductDto productDto)
	{
		ProductDto createdData = this.productService.create(productDto) ;
		return new ResponseEntity<ProductDto>(createdData, HttpStatus.CREATED);
	}
	
	//Update
//	@PreAuthorize("hasRole('ADMIN')")  // only admin can do this operation ... for that we use annotation at the top of security config
	@PutMapping("/{pId}")
	public ResponseEntity<?> UpdateProduct( @PathVariable String pId , @RequestBody ProductDto productDto)
	{
		ProductDto updatedData = this.productService.updateProduct(productDto, pId);
		return new ResponseEntity<ProductDto>(updatedData, HttpStatus.OK);
	}
	
	// delete
//	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{pId}")
	public ResponseEntity<ApiResponseMessage> delete(@PathVariable String pId){
		this.productService.delete(pId);
		ApiResponseMessage resp = new ApiResponseMessage() ;
		resp.setMessage("Deleted SuccessFully");
		resp.setSuccess(true);
		resp.setCode(HttpStatus.OK);
		return new ResponseEntity<ApiResponseMessage>(resp, HttpStatus.OK) ;
	}
	
	//getBYId
	@GetMapping("/{pId}")
	public ResponseEntity<ProductDto> getSingleProduct(@PathVariable String pId){
		ProductDto singleProduct = this.productService.getById(pId) ;
		return new ResponseEntity<ProductDto>(singleProduct, HttpStatus.OK) ;
	}
	
	
	//getAll
	@GetMapping
	public ResponseEntity<PageableResponse<ProductDto>> getAllProduct(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		
		PageableResponse<ProductDto> allProduct = this.productService.getAll(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<ProductDto>>(allProduct, HttpStatus.OK);
	}
	
	
	
	//GetALlLive
	@GetMapping("/live")
	public ResponseEntity<PageableResponse<ProductDto>> getAllLive(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		
		PageableResponse<ProductDto> allLiveProduct = this.productService.getAllLive(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<ProductDto>>(allLiveProduct, HttpStatus.OK);
	}
	
	
	//serachByTitle
	@GetMapping("/search/{title}")
	public ResponseEntity<PageableResponse<ProductDto>> getByTitle(
			@PathVariable String title,
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "title", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		
		PageableResponse<ProductDto> allLiveProduct = this.productService.searchByTitle(title, pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<ProductDto>>(allLiveProduct, HttpStatus.OK);
	}
	
	
	// upload an Image
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/image/{pId}")
	public ResponseEntity<ImageResponse> uploadImage(@RequestParam("productImg") MultipartFile file , @PathVariable String pId) throws IOException{
		
		String fileUploaded = this.fileService.uploadFiles(file, productImagePath);
		String updatedName = fileUploaded.substring(fileUploaded.lastIndexOf("/") + 1);
		
		// Now we have to set the updatedName For that product in db ;
		// now fetch the particular product with id and attach the image 
		
		ProductDto product = this.productService.getById(pId);
		product.setProductImageName(updatedName) ;
		
		// Now we set the name then we have to save to db also;
		 @SuppressWarnings("unused")
		ProductDto updatedProduct = this.productService.updateProduct(product, pId);
		
		ImageResponse imageResponse = new ImageResponse() ;
		imageResponse.setCode(HttpStatus.CREATED) ;
		imageResponse.setImageName(updatedName) ;
		imageResponse.setMessage("File Uploded Successfully");
		imageResponse.setSuccess(true);
		return new ResponseEntity<ImageResponse>(imageResponse, imageResponse.getCode()) ;
		
		
	}
	
	@GetMapping("/image/{pId}")
	public void serveImage(@PathVariable String pId, HttpServletResponse response) throws IOException {

		ProductDto productData = this.productService.getById(pId);
		String ImgName = productData.getProductImageName();
		InputStream inputStream = this.fileService.getResource(productImagePath , ImgName);
		// we get the data in form of InputStream;
		// for that we have to send in response via HttpServletResponse -> output ;
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		// now we have to send the response
		StreamUtils.copy(inputStream, response.getOutputStream());

	}
		
	//create Product with category
//	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping("/addWithcategory/{categoryId}")
	public ResponseEntity<ProductDto> InsertProductInCategory(@RequestBody ProductDto productDto , @PathVariable String categoryId){
		logger.info("our cid is {} " , categoryId);
		
		ProductDto savedWithcategory = this.productService.createWithCategory(productDto, categoryId);
		return new ResponseEntity<ProductDto> (savedWithcategory , HttpStatus.CREATED);
	}
	
	
	
}
