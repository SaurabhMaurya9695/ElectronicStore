package com.store.service.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.util.ReflectionTestUtils;
import com.store.controller.UserController;
import com.store.dto.PageableResponse;
import com.store.dto.RoleDto;
import com.store.dto.UserDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.FileService;
import com.store.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
	UserController userController =  new  UserController() ;
	
	@Mock
	UserService userService;
	
	@Mock
	FileService fileService;
	
//	@Mock
//	MultipartFile file;
	
	@BeforeEach
	public void setUp() {
		ReflectionTestUtils.setField(userController, "userService", userService);
		ReflectionTestUtils.setField(userController, "fileService", fileService);
	}
	
	@Test
	public void createUserTest() {
		RoleDto role = new RoleDto() ;
		role.setRoleId(UUID.randomUUID().toString());
		role.setRoleName("NORMAL");
		
		UserDto user = new UserDto() ;
		user.setAbout("this is for testing");
		user.setEmail("saurabhyash1707@gmail.com");
		user.setGender("male");
		user.setImage("abc.png");
		user.setName("saurabh");
		user.setPassword("saurabh");
		Set<RoleDto> x =new HashSet<>();
		x.add(role);
		user.setRoles(x);
		
		Mockito.when(this.userService.createUser(user)).thenReturn(user);
		ResponseEntity<UserDto> resp = this.userController.createUser(user);
		Assertions.assertEquals(HttpStatus.CREATED, resp.getStatusCode());
		
	}

	@Test
	public void getSingleUserTest() {
		UserDto user = new UserDto();
		Mockito.when(userService.getUserById("userId")).thenReturn(user);
		ResponseEntity<UserDto> x = userController.getSingleUser("userId");
		Assertions.assertEquals(HttpStatus.OK, x.getStatusCode());
		
	}
	
	@Test
	public void getAllUserTest() {
		PageableResponse<UserDto> pageableResponse = new PageableResponse<>() ;
		Mockito.when(userService.getAllUser(1,5 , "email" ,"desc")).thenReturn(pageableResponse);
		ResponseEntity<PageableResponse<UserDto>> resp = userController.getAllUser(1,5 , "email" ,"desc");
		Assertions.assertEquals(HttpStatus.OK, resp.getStatusCode());
		
	}
	
	
//	@Test
//	public void UpdateUserTest() {
//		UserDto user = new UserDto();
//		Mockito.when(userService.updateUser(user, Mockito.anyString())).thenReturn(user);
//		ResponseEntity<UserDto> resp = userController.updateUser("userid", user);
//		Assertions.assertEquals(HttpStatus.ACCEPTED, resp.getStatusCode());
//		
//	}
	
	@Test
	public void deleteUserTest() {
		ResponseEntity<ApiResponseMessage> resp = userController.deleteUser("userId");
		Assertions.assertEquals("User Deleted Successfully" , resp.getBody().getMessage());
	}
	
	@Test
	public void getSingleByEmailTest() {
		UserDto user = new UserDto() ;
		Mockito.when(userService.getUserByEmail("email")).thenReturn(user);
		ResponseEntity<UserDto> resp = userController.getSingleByEmail("email");
		Assertions.assertEquals(HttpStatus.OK, resp.getStatusCode());
	}
	
	@Test
	public void searchUserEmailTest() {
		List<UserDto> users = new  ArrayList<>();
		Mockito.when(userService.searchUser("value")).thenReturn(users);
		ResponseEntity<List<UserDto>> resp = userController.searchUser("value");
		Assertions.assertEquals(HttpStatus.OK, resp.getStatusCode());
	}
	
//	@Test
//	public void uploadFileTest() throws IOException {
//		
//		UserDto user = new UserDto();
//		FileInputStream inputFile = new FileInputStream( "path of the file");  
//		MockMultipartFile file = new MockMultipartFile("file", "NameOfTheFile", "multipart/form-data",
//				inputFile); 
//		String path = "images/users/";
//		
//		String originamFileName = file.getOriginalFilename(); // abc.png
//		String filename = UUID.randomUUID().toString(); // generated random Id ;
//		String ext = originamFileName.substring(originamFileName.lastIndexOf("."));
//		String fileNameWithExtension = filename + ext ;
//		String fullPathNameWithFileExtension = path  + fileNameWithExtension;
//		
//		
//		Mockito.when(fileService.uploadFiles(file , fullPathNameWithFileExtension)).thenReturn("imgName");
//		Mockito.when(userService.getUserById("userId")).thenReturn(user);
//		Mockito.when(userService.updateUser(user, "userId")).thenReturn(user);
//		
//		ResponseEntity<ImageResponse> resp = userController.uploadFile(file, "userId");
//		Assertions.assertEquals(HttpStatus.CREATED , resp.getStatusCode());
//		
//	}
	
	
}
