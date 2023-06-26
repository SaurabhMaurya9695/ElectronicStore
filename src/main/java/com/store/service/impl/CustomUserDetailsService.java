package com.store.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.store.entities.User;
import com.store.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;

	// This Class helps us to load the userName
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		User user  = this.userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("User not Found with this emailId !!"));
		return user;
	}

}
