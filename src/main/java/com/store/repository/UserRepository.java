package com.store.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.User;

public interface UserRepository extends JpaRepository<User, String> {

	//implementation provide automatically at run Time;
	
	// getUserByEmail ;
	
	Optional<User> findByEmail(String email);
	Optional<User> findByEmailAndPassword(String email , String password );
	Optional<List<User>> findByNameContaining(String keyword);
}
