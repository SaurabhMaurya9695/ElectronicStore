package com.store.controller;

import java.util.HashMap;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.MailDto;
import com.store.dto.UserDto;
import com.store.entities.User;
import com.store.repository.UserRepository;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.MailService;
import com.store.service.UserService;

import jakarta.mail.MessagingException;


@RestController
@RequestMapping("/forget")
@CrossOrigin
public class FogetPasswordController {
	
	@Autowired
	private MailService mailService ;
	
	@Autowired
	private UserService userService ;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BCryptPasswordEncoder encoder;
	
	private HashMap<String, Object> mp = new HashMap<>() ;
	
	@PostMapping("/send-otp")
	public ApiResponseMessage sendOtp(@RequestParam("email") String email ) throws MessagingException {
		int otp = (int) (Math.random() * 999999);
		System.out.println(otp);
		// this will generate a random password
		//now send this OTP to uses's email
		mp.put("OTP", otp);
		mp.put("EMAIL", email);
		MailDto mailDto = new MailDto("OTP from AapkiDukaan's","Your OTP is " + otp + " Do not Share With Anyone else." , email, "");
		System.out.println(mailDto.toString());
		ApiResponseMessage resp = mailService.sendMailFun(mailDto);
		return resp;
	}
	
	
	@PostMapping("/verify-otp")
	public ApiResponseMessage verifyOtp(@RequestParam("otp") String OTP) {

		String email = (String) mp.get("EMAIL") ;
		int savedOtp = (int) mp.get("OTP");
		UserDto user = userService.getUserByEmail(email);
		if(user == null) {
			mp.clear();
			return new ApiResponseMessage("User Not Found With This Email", false, HttpStatus.NOT_FOUND);
		}
		if(savedOtp == Integer.parseInt(OTP)) { // if both password matched then 
			mp.remove("OTP") ;
			return new ApiResponseMessage("OTP MATCHED", true, HttpStatus.OK);
		}else {
			mp.clear();
			return new ApiResponseMessage("OTP NOT MATCHED", false, HttpStatus.NOT_ACCEPTABLE);
		}
	}

	
	
	@PutMapping("/reset-password")
	public ApiResponseMessage resetPassword(@RequestParam("key") String password) {
		System.out.println(password);
		String email = (String) mp.get("EMAIL") ;
		UserDto user = userService.getUserByEmail(email);
		if(user == null) {
			return new ApiResponseMessage("User Not Found With This Email", false, HttpStatus.NOT_FOUND);
		}
		
		user.setPassword(encoder.encode(password));
		
		User userEntity = modelMapper.map(user, User.class);
		
		User savedUser = userRepository.save(userEntity);
		System.out.println(savedUser.getPassword() + savedUser.getName());
		mp.clear();
		return new ApiResponseMessage("User's Password Change", true, HttpStatus.ACCEPTED);
		
	}
}
