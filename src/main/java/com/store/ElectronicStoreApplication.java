package com.store;

import java.util.Arrays;
import java.util.Set;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.store.entities.Role;
import com.store.entities.User;
import com.store.repository.RoleRepository;
import com.store.repository.UserRepository;

@SpringBootApplication
public class ElectronicStoreApplication implements CommandLineRunner{
	
	private static final Logger log = LoggerFactory.getLogger(ElectronicStoreApplication.class);
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserRepository userRepository ;
	
	
	@Value("${role.normal_role_id}")
	private String normalroleId;
	
	
	@Value("${role.admin_role_id}")
	private String adminroleId;

	public static void main(String[] args) {
//		System.out.println("jvm version " + System.getProperty("java.version"));  -> to know the jvm version
		SpringApplication.run(ElectronicStoreApplication.class, args);
	}

	
	
	@Override
	public void run(String... args) throws Exception {
//		System.out.println(passwordEncoder.encode("Saurabh"));
//		System.out.println(passwordEncoder.encode("123"));
		
		try {
			Role admin_role = new Role();
			admin_role.setRoleId(adminroleId);
			admin_role.setRoleName("ROLE_ADMIN");
			
			Role normal_role = new Role();
			normal_role.setRoleId(normalroleId);
			normal_role.setRoleName("ROLE_NORMAL");
			
			User user = new User();
			user.setAbout("this is admin user");
			user.setEmail("saurabhyash1707@gmail.com");
			user.setGender("Male");
			user.setImage("x.png");
			user.setName("Saurabh Maurya");
			user.setPassword("263396e9-a95e-4fc7-a2f1-1b7f3d9c4880");
			user.setRoles(Set.of(admin_role ,normal_role));
			user.setUserId(UUID.randomUUID().toString());
			
			User user1 = new User();
			user1.setAbout("this is normal user");
			user1.setEmail("yash@gmail.com");
			user1.setGender("Male");
			user1.setImage("x.png");
			user1.setName("Yash Maurya");
			user1.setPassword("53e3f852-5fa5-4cb2-8369-c77352a9e86a");
			user1.setRoles(Set.of(normal_role));
			user1.setUserId(UUID.randomUUID().toString());
			
			this.roleRepository.saveAll(Arrays.asList(admin_role , normal_role));
			this.userRepository.save(user);
			this.userRepository.save(user1);
		}catch(Exception e) {
			log.warn("Already Present In db");
		}
		
	}
	
	
	//globally Cors configuration .. to apply this you have to add @crossorigin to the controller  
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedHeaders("*")
						.maxAge(3600L)
						.allowCredentials(true)
						.allowedMethods("*")
						.allowedOriginPatterns("*");
				
			}
		};
	}

}
