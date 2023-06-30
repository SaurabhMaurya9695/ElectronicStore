package com.store.service;

import java.util.List;
import java.util.Optional;

import com.store.dto.PageableResponse;
import com.store.dto.UserDto;
import com.store.entities.User;

public interface UserService {
	
	// provide only methods here
	//User createUser(User user); -> here we can't send entities , use UserDto here
	
	//create User 
	UserDto createUser(UserDto userDto);
	
	// get single User
	UserDto getUserById(String userId) ;
	
	//get AllUser;
	PageableResponse<UserDto> getAllUser(int pageNumber , int pageSize , String sortBy , String sortDir) ;
	
	//update User;
	UserDto updateUser(UserDto userDto , String userId) ;
	
	//delete User;
	void deleteUserById(String userId);
	
	//get Single User by Email;
	UserDto getUserByEmail(String email);
	
	//search user by keyword;
	List<UserDto> searchUser(String Keyword);

	Optional<User> findUserForGoogle(String email);
	
	//other SpecificUser;
	
}
