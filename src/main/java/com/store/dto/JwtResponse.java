package com.store.dto;

public class JwtResponse {
	private String jwttoken;
	private UserDto userDto;

	public JwtResponse(String jwttoken, UserDto userDto) {
		super();
		this.jwttoken = jwttoken;
		this.userDto = userDto;
	}

	public JwtResponse() {
		super();
		
	}

	public String getJwttoken() {
		return jwttoken;
	}

	public void setJwttoken(String jwttoken) {
		this.jwttoken = jwttoken;
	}

	public UserDto getUserDto() {
		return userDto;
	}

	public void setUserDto(UserDto userDto) {
		this.userDto = userDto;
	}

}
