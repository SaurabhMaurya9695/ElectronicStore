package com.store.responsemsg;

import org.springframework.http.HttpStatus;

public class ApiResponseMessage {
	// here we have to define which type of message we are showing on console 
	private boolean success ;
	private String  message ;
	private HttpStatus code;
	public ApiResponseMessage() {
		super();
		// TODO Auto-generated constructor stub
	}
	public ApiResponseMessage(String message, boolean success, HttpStatus code) {
		super();
		this.message = message;
		this.success = success;
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public HttpStatus getCode() {
		return code;
	}
	public void setCode(HttpStatus code) {
		this.code = code;
	}
	
}
