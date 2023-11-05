package com.store.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Map;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.store.dto.JwtRequest;
import com.store.dto.JwtResponse;
import com.store.dto.MailDto;
import com.store.dto.UserDto;
import com.store.entities.User;
import com.store.exceptions.BadApiRequestException;
import com.store.responsemsg.ApiResponseMessage;
import com.store.security.JwtHelper;
import com.store.service.MailService;
import com.store.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.mail.MessagingException;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class AuthController {

	private static final Logger log = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private MailService mailService;
	
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private JwtHelper jwtHelper;
	
	@Autowired
	private UserService userService;
	
	@Value("${google.newPassword}")
	private String newPassword;
	
	@Value("${google.googleClientId}")
	private String googleClientId;
	
	@Autowired
	private ModelMapper mapper;

	

	@Operation(
			summary = "Get the Jwt Token by Entering the UserId and password",
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
	@PostMapping("/login")
	public ResponseEntity<JwtResponse> login(@RequestBody JwtRequest jwtRequest) throws MessagingException {
		// now we have username and password here from jwtrequest;
		this.doAuthenticate(jwtRequest.getEmail(), jwtRequest.getPassword());

//		if no exception came till now then now generate the token 
		UserDetails details = userDetailsService.loadUserByUsername(jwtRequest.getEmail());
		UserDto user = userService.getUserByEmail(jwtRequest.getEmail());
		String token = this.jwtHelper.generateToken(details);

		JwtResponse jwtResponse = new JwtResponse();
		jwtResponse.setJwttoken(token);
		jwtResponse.setUserDto(modelMapper.map(details, UserDto.class));
		
		MailDto dto = new MailDto();
		dto.setEmail(jwtRequest.getEmail());
		dto.setName(user.getName());
		ApiResponseMessage x = mailService.sendMailFunAfterLogin(dto);
		log.info("Login Sucessfully {}",x.getMessage());

		return new ResponseEntity<JwtResponse>(jwtResponse, HttpStatus.OK);

	}

	private void doAuthenticate(String email, String password) {
		UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(email,
				password);
		try {
			manager.authenticate(authenticationToken);
		} catch (BadCredentialsException e) {
			throw new BadApiRequestException("Invalid credentials ");
		}

	}
	
	@Operation(
			summary = "Get the current Login User details  EndPoint",
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

	@GetMapping("/currentUser")
	public ResponseEntity<UserDto> getCurrentUser(Principal principal) {
		String currentUserName = principal.getName();
		log.error("login User name is : {} ", currentUserName);

		UserDetails fullUserDetails = userDetailsService.loadUserByUsername(currentUserName);
		UserDto userDto = modelMapper.map(fullUserDetails, UserDto.class);
		return new ResponseEntity<>(userDto, HttpStatus.OK);
	}

	/* Login with google */
	@Operation(
			summary = "Login with google EndPoint",
			description = "here you have to pass the Data which is coming from google client",
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
	@PostMapping("/google")
	public ResponseEntity<JwtResponse> loginWithGoogle(@RequestBody Map<String, Object> data) throws IOException, MessagingException {

		// 1 : get the idToken from request ;
		String idToken = data.get("credential").toString();

		// 2 : now we have to verify with the google
		NetHttpTransport netHttpTransport = new NetHttpTransport();
		JacksonFactory jacksonFactory = JacksonFactory.getDefaultInstance();

		// these above classes help us to made a verifier
		GoogleIdTokenVerifier.Builder verifier = new GoogleIdTokenVerifier.Builder(netHttpTransport, jacksonFactory)
				.setAudience(Collections.singleton(googleClientId));
		// 3 : now we have to make googleIdToken with the help of verifier .
		
		GoogleIdToken googleIdToken =  GoogleIdToken.parse(verifier.getJsonFactory() , idToken);
		
		GoogleIdToken.Payload userData = googleIdToken.getPayload();
		
		log.info("Payload Value is {} " , userData );
		
		String userEmail = userData.getEmail();
		
		// 4 : now check with this email id user exist or not ?
		
		User user = null ;
		user = this.userService.findUserForGoogle(userEmail).orElse(null);
		
		if(user == null) {
			log.info("Creating new User because user is null");
			//save user
			user = this.saveUser(userEmail ,  data.get("name").toString() , data.get("photoUrl").toString());
			
		}
		else {
			log.info("User Already exist in db");
		}
		
		JwtRequest jwtRequest = new JwtRequest();
		jwtRequest.setEmail(userEmail);
		jwtRequest.setPassword(newPassword);
		ResponseEntity<JwtResponse> response = this.login(jwtRequest);
		return response;
	}

	private User saveUser(String email , String name, String image) {
		UserDto dto = new UserDto();
		dto.setName(name);
		dto.setEmail(email);
		dto.setPassword(this.newPassword);
		log.info("setting new password in dto {} and {}" , dto.getPassword() , this.newPassword);
		dto.setImage(image);
		dto.setRoles(new HashSet<>());
		UserDto savedUserWithGoogle = userService.createUser(dto);
		log.info("User saved in db");
		return this.mapper.map(savedUserWithGoogle, User.class);
	}

}
