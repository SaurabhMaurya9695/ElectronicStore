package com.store.service;

import static org.mockito.Mockito.times;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import com.store.dto.PageableResponse;
import com.store.dto.UserDto;
import com.store.entities.Role;
import com.store.entities.User;
import com.store.repository.RoleRepository;
import com.store.repository.UserRepository;

@SpringBootTest
public class UserServiceTest {
	
	
	@MockBean
	private UserRepository userRepository;
	
	@MockBean
	private RoleRepository roleRepository; 

	
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ModelMapper modelMapper ;
	
	User user ;
	Role role ;
	
	
	@BeforeEach
	public void init() {
		Role role1 = new Role();
		role1.setRoleId("abc");
		role1.setRoleName("NORMAL");
		role = role1;
		
		User user1 = new User();
		user1.setAbout("this is for testing");
		user1.setEmail("saurabhyash1707@gmail.com");
		user1.setGender("male");
		user1.setImage("abc.png");
		user1.setName("saurabh");
		user1.setPassword("saurabh");
		user1.setRoles(Set.of(role));
		user = user1;
		
	}
	
	@Test
	public void CreateUserTest() {
		Mockito.when(userRepository.save(Mockito.any())).thenReturn(user);
		Mockito.when(roleRepository.findById(Mockito.anyString())).thenReturn(Optional.of(role));
		UserDto userDto = userService.createUser(modelMapper.map(user , UserDto.class));
		System.out.println(userDto.getName());
		Assertions.assertNotNull(userDto);
		
	}
	
	@Test
	public void getUserByIdTest() {
		Mockito.when(userRepository.findById(Mockito.anyString())).thenReturn(Optional.of(user));
		UserDto user = userService.getUserById(Mockito.anyString());
		Assertions.assertNotNull(user);
	}
	
	@Test
	public void getAllUserTest() {
		User user1 = new User();
		user1.setAbout("this is for testing");
		user1.setEmail("saurabhyash1707@gmail.com");
		user1.setGender("male");
		user1.setImage("abc.png");
		user1.setName("saurabh");
		user1.setPassword("saurabh");
		user1.setRoles(Set.of(role));
		
		User user2 = new User();
		user2.setAbout("this is for testing2");
		user2.setEmail("saurabhyash17072@gmail.com");
		user2.setGender("male2");
		user2.setImage("abc.png");
		user2.setName("saurabh2");
		user2.setPassword("saurabh2");
		user2.setRoles(Set.of(role));
		
		
		List<User> userList = Arrays.asList(user1 , user2); 
		
		Page<User> pp = new PageImpl<>(userList);
		Mockito.when(userRepository.findAll((Pageable)Mockito.any())).thenReturn(pp);
		
		PageableResponse<UserDto> ans = userService.getAllUser(1, 5 , "email", "asc" );
		Assertions.assertNotNull(ans);
		Assertions.assertEquals(2, ans.getContent().size());
	}
	
	@Test
	public void updateUserTest() {
		String userId = "abc";
		
		UserDto user1 = new UserDto();
		user1.setAbout("this is for updated Userdto");
		user1.setEmail("sm0107870@gmail.com");
		user1.setGender("Male");
		user1.setImage("abc.png");
		user1.setName("Saurabh Maurya");
		
		Mockito.when(userRepository.findById(Mockito.anyString())).thenReturn(Optional.of(user));
		Mockito.when(userRepository.save(user)).thenReturn(user);
		
		UserDto u =  userService.updateUser(user1, userId);
		System.out.println(u.getName());
		Assertions.assertNotNull(u);
		
	}

	
	@Test
	public void deleteUserByIdTest() {
		String id = "abcd";
		Mockito.when(userRepository.findById(Mockito.anyString())).thenReturn(Optional.of(user));
		userService.deleteUserById(id);
		Mockito.verify(userRepository , times(1)).delete(user);
		
	}
	
	@Test
	public void getUserByEmailTest() {
		Mockito.when(userRepository.findByEmail(Mockito.anyString())).thenReturn(Optional.of(user));
		UserDto userDto = userService.getUserByEmail("saurabhyash1707@gmail.com");
		Assertions.assertNotNull(userDto);
	}
	
	@Test
	public void searchUserTest() {
		List<User> val = new ArrayList<>() ;
		val.add(user);
		Mockito.when(userRepository.findByNameContaining(Mockito.anyString())).thenReturn(Optional.of(val));
		List<UserDto> userDto = userService.searchUser("saurabh");
		System.out.println(userDto.size());
		Assertions.assertNotNull(userDto);
	}
	
	
	
	
	
}
