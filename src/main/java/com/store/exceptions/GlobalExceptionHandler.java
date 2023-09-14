package com.store.exceptions;

import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.naming.SizeLimitExceededException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.store.responsemsg.ApiResponseMessage;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	private Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
	
	//Handle ResourceNotFoundException
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponseMessage> resourceNotFoundExceptionHandler(ResourceNotFoundException ex){
		// when ResourceNotFoundException is generated then this function is called automatically;
		
		log.info("Exceptional Handler Invoke!!!");
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage() ;
		apiResponseMessage.setMessage(ex.getMessage());
		apiResponseMessage.setCode(HttpStatus.NOT_FOUND);;
		apiResponseMessage.setSuccess(false);
		return new ResponseEntity<ApiResponseMessage>(apiResponseMessage,HttpStatus.NOT_FOUND );
	}
	
	//MethodArgumentNotFoundException
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, Object>> methodArgumentNotValidFoundExceptionHandler(MethodArgumentNotValidException ex){
		List<ObjectError> allErrors = ex.getBindingResult().getAllErrors();
		Map<String, Object> mp = new HashMap<>();
		   allErrors.stream().forEach(e -> {
			String errorMsg = e.getDefaultMessage() ;
			String field = ((FieldError)e).getField() ;
			mp.put(field, errorMsg);
		});
		   
		 return new ResponseEntity<Map<String,Object>>(mp, HttpStatus.BAD_REQUEST);
	}
	
	//BadApiRequest;
	
	@ExceptionHandler(BadApiRequestException.class)
	public ResponseEntity<ApiResponseMessage> badApiRequestHandler(BadApiRequestException ex){
		log.info("BadApiRequestException Handler Invoke!!!");
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage() ;
		apiResponseMessage.setMessage(ex.getMessage());
		apiResponseMessage.setCode(HttpStatus.BAD_REQUEST);;
		apiResponseMessage.setSuccess(false);
		return new ResponseEntity<ApiResponseMessage>(apiResponseMessage,HttpStatus.BAD_REQUEST);
	}
	
	
	@ExceptionHandler(FileNotFoundException.class)
	public ResponseEntity<ApiResponseMessage> fileNotFoundExceptionhandler(FileNotFoundException ex){
		log.info("FileNotFoundException Handler Invoke!!!");
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage() ;
		apiResponseMessage.setMessage("File Not Found");
		apiResponseMessage.setCode(HttpStatus.BAD_REQUEST);;
		apiResponseMessage.setSuccess(false);
		return new ResponseEntity<ApiResponseMessage>(apiResponseMessage,HttpStatus.BAD_REQUEST);
	}
	
	@ExceptionHandler(SizeLimitExceededException.class)
	public ResponseEntity<ApiResponseMessage> sizeLimitExceededExceptionHandler(SizeLimitExceededException ex){
		log.info("SizeLimitExceededException Handler Invoke!!!");
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage() ;
		apiResponseMessage.setMessage("You Uploded File which is greator then file Limit");
		apiResponseMessage.setCode(HttpStatus.BAD_REQUEST);;
		apiResponseMessage.setSuccess(false);
		return new ResponseEntity<ApiResponseMessage>(apiResponseMessage,HttpStatus.BAD_REQUEST);
	}
	
}







