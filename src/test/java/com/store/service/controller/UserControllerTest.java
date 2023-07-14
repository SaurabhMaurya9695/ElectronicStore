package com.store.service.controller;

import java.util.HashSet;
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
import com.store.dto.RoleDto;
import com.store.dto.UserDto;
import com.store.service.UserService;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {
	UserController userController =  new  UserController() ;
	
	@Mock
	UserService userService;
	
	@BeforeEach
	public void setUp() {
		ReflectionTestUtils.setField(userController, "userService", userService);
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
}
