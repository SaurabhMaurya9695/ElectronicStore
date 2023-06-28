package com.store.controller;

import java.security.Principal;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.JwtRequest;
import com.store.dto.JwtResponse;
import com.store.dto.UserDto;
import com.store.exceptions.BadApiRequestException;
import com.store.security.JwtHelper;
import com.store.service.UserService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	private static final Logger log = LoggerFactory.getLogger(AuthController.class);
	
	@Autowired
	private UserDetailsService userDetailsService ;
	
	@Autowired
	private ModelMapper modelMapper ;
	
	@Autowired
	private AuthenticationManager manager ;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private JwtHelper jwtHelper;
	
	
	
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest){
		// now we have username and password here from jwtrequest;
		this.doAuthenticate(jwtRequest.getEmail() , jwtRequest.getPassword());
		
//		if no exception came till now then now generate the token 
		UserDetails details = userDetailsService.loadUserByUsername(jwtRequest.getEmail());
		String token = this.jwtHelper.generateToken(details);
		
		JwtResponse jwtResponse = new JwtResponse() ;
		jwtResponse.setJwttoken(token);
		jwtResponse.setUserDto(modelMapper.map(details, UserDto.class));
		
		return new ResponseEntity<JwtResponse>(jwtResponse, HttpStatus.OK);
		
		
	}
	
	private void doAuthenticate(String email, String password) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email, password) ;
		try {
			manager.authenticate(authenticationToken);
		}catch(BadCredentialsException e) {
			throw new BadApiRequestException("Invalid credentials ");
		}
		
		
	}

	@GetMapping("/currentUser")
	public ResponseEntity<UserDto> getCurrentUser(Principal principal){
		String currentUserName = principal.getName();
		log.error("login User name is : {} " , currentUserName);
		
		UserDetails fullUserDetails = userDetailsService.loadUserByUsername(currentUserName);
		UserDto userDto = modelMapper.map(fullUserDetails, UserDto.class);
		return new ResponseEntity<>( userDto , HttpStatus.OK);
	}
	
	
	
}
