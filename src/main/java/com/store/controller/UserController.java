package com.store.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
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

import com.store.dto.PageableResponse;
import com.store.dto.UserDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.responsemsg.ImageResponse;
import com.store.service.FileService;
import com.store.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class UserController {

	@Autowired
	private FileService fileService;
	@Autowired
	private UserService userService;

	@Value("${user.profile.image.path}")
	private String imageUploadPath;

	static final Logger logger = LoggerFactory.getLogger(UserController.class);

	// methods for all operation

	// create User Methods
	
	@Operation(
			description = "Get Endpoint for CreateUser",
			summary = "This is a summary of CreateUser",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@PostMapping("/")
	public ResponseEntity<UserDto> createUser(@Valid @RequestBody UserDto data) {
		logger.error("data is {}", data.getName());
		UserDto userDto = this.userService.createUser(data);
		return new ResponseEntity<UserDto>(userDto, HttpStatus.CREATED);
	}
	

	// getallUser;
	@Operation(
			summary = "GetAllUser EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
//	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping()
	public ResponseEntity<PageableResponse<UserDto>> getAllUser(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "name", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		logger.info("Page Number is :{} and pageSize is {} , sortBy {} , sortDir {} ", pageNumber, pageSize, sortBy,
				sortDir);
		PageableResponse<UserDto> x = this.userService.getAllUser(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<UserDto>>(x, HttpStatus.OK);
	}

	// getSingleUser ;
	@Operation(
			summary = "Get Single User",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@GetMapping("/{userId}")
	public ResponseEntity<UserDto> getSingleUser(@PathVariable String userId) {
		UserDto userDto = this.userService.getUserById(userId);
		return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}

	@Operation(
			summary = "Update User by entering userId EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@PutMapping("/{userId}")
	public ResponseEntity<UserDto> updateUser(@PathVariable String userId, @Valid @RequestBody UserDto dataDto) {
		UserDto updatedUser = this.userService.updateUser(dataDto, userId);
		return new ResponseEntity<UserDto>(updatedUser, HttpStatus.ACCEPTED);
	}

	@Operation(
			summary = "Delete User of userId EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponseMessage> deleteUser(@PathVariable String userId) {
		this.userService.deleteUserById(userId);
		ApiResponseMessage apiMessage = new ApiResponseMessage("User Deleted Successfully", true, HttpStatus.OK);
		return new ResponseEntity<ApiResponseMessage>(apiMessage, HttpStatus.OK);
	}

	@Operation(
			summary = "Get User of particular emailId",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@GetMapping("/email/{email}")
	public ResponseEntity<UserDto> getSingleByEmail(@PathVariable String email) {

		logger.info("email id is :{} ", email);
		UserDto userDto = this.userService.getUserByEmail(email);
		return new ResponseEntity<UserDto>(userDto, HttpStatus.OK);
	}

	@Operation(
			summary = "Search User by any Key EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@GetMapping("/searchKey/{value}")
	public ResponseEntity<List<UserDto>> searchUser(@PathVariable String value) {
		logger.info("Keyword  id is :{} ", value);
		List<UserDto> users = this.userService.searchUser(value);
		return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
	}

	// Upload User Image ;
	@Operation(
			summary = "Upload Image for a single User EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@PostMapping("/image/{userId}")
	public ResponseEntity<ImageResponse> uploadFile(@RequestParam("image") MultipartFile file,
			@PathVariable("userId") String userId) throws IOException {

		logger.info("File name is : {} , id is : {} ", file.getOriginalFilename(), userId);
		// we have to update imageName in db corresponding to userId
		String imgName = this.fileService.uploadFiles(file, imageUploadPath);
		String updatedName = imgName.substring(imgName.lastIndexOf("/") + 1);
		logger.info("Image Name after uploading :{}", imgName);
		logger.error("updatedFileName is :{}", updatedName);

		UserDto currentUser = this.userService.getUserById(userId);
		currentUser.setImage(updatedName);

		@SuppressWarnings("unused")
		UserDto updatedWithImg = this.userService.updateUser(currentUser, userId); // image upload at server db;

		ImageResponse imageResponse = new ImageResponse();
		imageResponse.setImageName(updatedName);
		imageResponse.setMessage("File uploaded Sucessfully");
		imageResponse.setCode(HttpStatus.CREATED);
		imageResponse.setSuccess(true);
		return new ResponseEntity<ImageResponse>(imageResponse, HttpStatus.CREATED);
	}

	
	@Operation(
			summary = "Get Image of Particular User EndPoint",
			responses = {
					@ApiResponse(
								responseCode = "200",
								description = "Success"
							),
					@ApiResponse(
							responseCode = "403",
							description = "Unauthorized / Invalid Token"
						),
			}
	)
	@GetMapping("/image/{userId}")
	public void serveImage(@PathVariable String userId, HttpServletResponse response) throws IOException {

		// first get all the user data ;
		// after getting the data find the imageName you want
		UserDto userData = this.userService.getUserById(userId);
		logger.info("User Image name is : {}", userData.getImage());
		String ImgName = userData.getImage();
		InputStream inputStream = this.fileService.getResource(imageUploadPath, ImgName);

		// we get the data in form of InputStream;
		// for that we have to send in response via HttpServletResponse -> output ;

		response.setContentType(MediaType.IMAGE_JPEG_VALUE);

		// now we have to send the response

		StreamUtils.copy(inputStream, response.getOutputStream());

	}

}
