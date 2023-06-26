package com.store.exceptions;

@SuppressWarnings("serial")
public class BadApiRequestException extends RuntimeException {

	public BadApiRequestException() {
		super("Bad Api Request!!");
		// TODO Auto-generated constructor stub
	}
	
	public BadApiRequestException(String msg) {
		super(msg);
		// TODO Auto-generated constructor stub
	}

	

}
