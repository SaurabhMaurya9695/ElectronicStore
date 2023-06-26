package com.store.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.Category;
import com.store.entities.Product;

public interface ProductRepository extends JpaRepository<Product, String> {

	//search Method
	
	Page<Product> findByTitleContaining(String title , Pageable pageable) ;
	
	//findALl Live Products ;
	Page<Product> findByIsLiveTrue(Pageable pageable) ;
	
	//others Methods
	// find all products of given pId ;
	Page<Product> findByCategory(Category category , Pageable pageable);
}
