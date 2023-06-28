package com.store;

import java.util.Arrays;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.store.entities.Role;
import com.store.repository.RoleRepository;

@SpringBootApplication
public class ElectronicStoreApplication implements CommandLineRunner{
	
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Value("${role.normal_role_id}")
	private String normal_roleId;
	
	
	@Value("${role.admin_role_id}")
	private String admin_roleId;

	public static void main(String[] args) {
		SpringApplication.run(ElectronicStoreApplication.class, args);
	}

	
	
	@Override
	public void run(String... args) throws Exception {
//		System.out.println(passwordEncoder.encode("Saurabh"));
//		System.out.println(passwordEncoder.encode("123"));
		
		try {
			Role admin_role = new Role();
			admin_role.setRoleId(admin_roleId);
			admin_role.setRoleName("ADMIN");
			
			Role normal_role = new Role();
			normal_role.setRoleId(normal_roleId);
			normal_role.setRoleName("NORMAL");
			
			this.roleRepository.saveAll(Arrays.asList(admin_role , normal_role));
		}catch(Exception e) {
			e.printStackTrace();
		}
		
	}

}
