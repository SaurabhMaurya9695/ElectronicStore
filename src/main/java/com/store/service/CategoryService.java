package com.store.service;

import com.store.dto.CategoryDto;
import com.store.dto.PageableResponse;

public interface CategoryService {
	// create
	CategoryDto createCat(CategoryDto categoryDto);

	// delete
	void deleteCat(String catId);

	// getSinglecat ;
	CategoryDto getSingleCat(String catId);

	// update category
	CategoryDto updatedCat(CategoryDto categoryDto, String catId);

	PageableResponse<CategoryDto> getAllCat(int pageNumber, int pageSize, String sortBy, String sortDir);
	
	//search category
	
	
	

}
