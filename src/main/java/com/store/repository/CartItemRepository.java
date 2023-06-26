package com.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Integer> {

}
