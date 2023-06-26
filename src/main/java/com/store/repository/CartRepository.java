package com.store.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.Cart;
import com.store.entities.User;

public interface CartRepository extends JpaRepository<Cart, String> {
	
	Optional<Cart> findByUser(User user);
}
