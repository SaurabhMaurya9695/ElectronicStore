package com.store.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.store.entities.Category;

public interface CategoryRepository  extends JpaRepository<Category, String>{

}
