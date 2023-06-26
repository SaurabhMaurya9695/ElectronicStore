package com.store.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.UserDto;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private static final Logger log = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	private UserDetailsService userDetailsService ;
	
	@Autowired
	private ModelMapper modelMapper ;
	
	@GetMapping("/currentUser")
	public ResponseEntity<UserDto> getCurrentUser(Principal principal){
		String currentUserName = principal.getName();
		log.error("login User name is : {} " , currentUserName);
		
		UserDetails fullUserDetails = userDetailsService.loadUserByUsername(currentUserName);
		UserDto userDto = modelMapper.map(fullUserDetails, UserDto.class);
		return new ResponseEntity<>( userDto , HttpStatus.OK);
	}
}
