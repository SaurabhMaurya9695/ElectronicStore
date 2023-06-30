package com.store.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.store.dto.PageableResponse;
import com.store.dto.UserDto;
import com.store.entities.Role;
import com.store.entities.User;
import com.store.exceptions.ResourceNotFoundException;
import com.store.helper.Helper;
import com.store.repository.RoleRepository;
import com.store.repository.UserRepository;
import com.store.service.UserService;

@Service // don't forget to use here..
public class UserServiceImpl implements UserService {

	static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder ;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${user.profile.image.path}")
	private String imageUploadPath;
	
	@Value("${role.normal_role_id}")
	private String normal_roleId;
	
	
	@Value("${role.admin_role_id}")
	private String admin_roleId;

	@Autowired
	private RoleRepository roleRepository;

	@Override
	public UserDto createUser(UserDto userDto) {
		
		// generate unique userId by UUID methods , because we did'nt set any Auto
		// increment in DTO
		logger.info("We are here ");
		String userId = UUID.randomUUID().toString();

		logger.info("UserId is : {} ", userId);
		userDto.setUserId(userId);
		

		// we have to send userEntity to the Repository but we have UserDto , then we
		// have to convert DTo to entity first
		User user = dtoToEntity(userDto);
		user.setPassword(passwordEncoder.encode(userDto.getPassword()));
		logger.info("password has been set in encoded form  {} " , user.getPassword());
		
		//before saving in db you have to add roles also 
		
		Role normalrole = this.roleRepository.findById(normal_roleId).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
		
		//now set role to user;
		
		user.getRoles().add(normalrole);
		// now we can save our user Database ;
		User savedUser = this.userRepository.save(user);

		// we need to send back UserDto then we have to convert entity to DTO ;
		UserDto newDto = entityToDto(savedUser);

		// but we have send this dto back
		return newDto;
	}

	@Override
	public UserDto getUserById(String userId) {
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found with this id"));
		UserDto userDto = entityToDto(user);
		return userDto;
	}

	@Override
	public PageableResponse<UserDto> getAllUser(int pageNumber, int pageSize, String sortBy, String sortDir) {
		// findAll function internally used paging also for this we need to pass the
		// pageable object to the fun

		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());

		// pageNumber starts from zero
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		Page<User> page = this.userRepository.findAll(pageable);

		PageableResponse<UserDto> resp = Helper.getpageableResponse(page, UserDto.class);

		// we need to convert UserList To DTOList;

		return resp;
	}

	@Override
	public UserDto updateUser(UserDto userDto, String userId) {
		User xUser = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found with this id"));

		// we don;t have to set id ;
		xUser.setAbout(userDto.getAbout());
		xUser.setEmail(userDto.getEmail());
		xUser.setGender(userDto.getGender());
		xUser.setImage(userDto.getImage());
		xUser.setName(userDto.getName());
		xUser.setPassword(userDto.getPassword());

		// now user has updated data , now we can saved data in userRepository;

		User savedUser = this.userRepository.save(xUser); // it will give you entity ;
		UserDto savedDto = entityToDto(savedUser);
		return savedDto;
	}

	@Override
	public void deleteUserById(String userId) {
		// before deleting we need to find the user By this id
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found with this id"));
		// when we are deleting the use it will delete form db but related to this user
		// imag is still be
		// we want to delete images as well as
		
		String fullPath = imageUploadPath + user.getImage() ; // image/user/abc.png
		
		Path path = Paths.get(fullPath);
		try {
			Files.delete(path);
		}
		catch(NoSuchFileException ex) {
			logger.info("File Not Found in Folder");
			ex.printStackTrace();
		}
		catch (IOException e) {
			e.printStackTrace();
		}
		
		
		this.userRepository.delete(user);
		
	}

	@Override
	public UserDto getUserByEmail(String email) {
		User user = this.userRepository.findByEmail(email)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found With This email.."));
		return entityToDto(user);
	}

	@Override
	public List<UserDto> searchUser(String Keyword) {
		List<User> alluser = this.userRepository.findByNameContaining(Keyword)
				.orElseThrow(() -> new ResourceNotFoundException("No User Contain this Keywords"));
		List<UserDto> x = alluser.stream().map((user) -> entityToDto(user)).collect(Collectors.toList());
		return x;
	}
	
	@Override
	public Optional<User> findUserForGoogle(String email){
		return this.userRepository.findByEmail(email);
	}

	private User dtoToEntity(UserDto userDto) {

//		User user = new User() ;
//		user.setAbout(userDto.getAbout());
//		user.setEmail(userDto.getEmail());
//		user.setGender(userDto.getGender());
//		user.setImage(userDto.getImage());
//		user.setName(userDto.getName());
//		user.setPassword(userDto.getPassword());
//		user.setUserId(userDto.getUserId());
//		return user;

		// we can do like this also using mapper ; modelMapper.map(src , dstn) ;
		return modelMapper.map(userDto, User.class);
	}

	private UserDto entityToDto(User savedUser) {

//		UserDto userDto = new UserDto();
//		userDto.setAbout(savedUser.getAbout());
//		userDto.setEmail(savedUser.getEmail());
//		userDto.setGender(savedUser.getGender());
//		userDto.setImage(savedUser.getImage());
//		userDto.setName(savedUser.getName());
//		userDto.setPassword(savedUser.getPassword());
//		userDto.setUserId(savedUser.getUserId());
//		return userDto;

		return modelMapper.map(savedUser, UserDto.class);
	}

}
