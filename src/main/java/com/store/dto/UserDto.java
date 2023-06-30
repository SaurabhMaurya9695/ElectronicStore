package com.store.dto;

import java.util.HashSet;
import java.util.Set;

import com.store.validate.ImageNameValid;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

//this class is responsib"le for transferring the UserD
public class UserDto {

	// we have to place the same thing here without annotation this time
	private String userId;

	@Size(min = 3 , max = 20 , message = "Please Write in Range of 3-15 letters")
	private String name;
	
//	@Email(message = "Invalid Email")
	@Pattern(regexp = "^[a-z0-9][-a-z0-9._]+@([-a-z0-9]+\\.)+[a-z]{2,5}$" , message = "Invalid Email")
	@NotBlank
	private String email;

	@NotBlank(message = "Password is required")
	private String password;
	
	@Size(min = 4 , max = 6 , message = "Please Write Correct Gender")
	private String gender;

	@NotBlank(message = "Please Write Something about Yourself")
	private String about;

	@ImageNameValid
	private String image;
	
	private Set<RoleDto> roles = new HashSet<>();
	

	public Set<RoleDto> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleDto> roles) {
		this.roles = roles;
	}

	public UserDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UserDto(String userId, String name, String email, String password, String gender, String about,
			String image) {
		super();
		this.userId = userId;
		this.name = name;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.about = about;
		this.image = image;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getAbout() {
		return about;
	}

	public void setAbout(String about) {
		this.about = about;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
	

}
