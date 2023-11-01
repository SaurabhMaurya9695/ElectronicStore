package com.store.dto;

import jakarta.validation.constraints.NotNull;

public class MailDto {
	private String subject;
	private String message;

	@NotNull
	private String email;
	private String name;

	public MailDto(String subject, String message, String email, String name) {
		super();
		this.subject = subject;
		this.message = message;
		this.email = email;
		this.name = name;
	}

	public MailDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = "Feedback From ";
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return "MailDto [subject=" + subject + ", message=" + message + ", email=" + email + ", name=" + name + "]";
	}

}
