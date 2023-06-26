package com.store.responsemsg;

import org.springframework.http.HttpStatus;

public class ImageResponse {
	private String imageName;
	private String message;
	private boolean success;
	private HttpStatus code;

	public ImageResponse() {
		super();
	}

	public ImageResponse(String imageName, String message, boolean success, HttpStatus code) {
		super();
		this.imageName = imageName;
		this.message = message;
		this.success = success;
		this.code = code;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
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
