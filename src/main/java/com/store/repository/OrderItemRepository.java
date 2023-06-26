package com.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.OrderItems;

public interface OrderItemRepository  extends JpaRepository<OrderItems, Integer>{
	
	
}
