package com.store.service;

import com.store.dto.PageableResponse;
import com.store.dto.ProductDto;

public interface ProductService {
	
	//create
	ProductDto create(ProductDto data);
	
	//update 
	ProductDto updateProduct(ProductDto data , String pid);
	
	//delete
	void delete(String pid);
	
	//getByid
	ProductDto getById(String pid) ;
	
	PageableResponse<ProductDto> getAll(int pageNumber, int pageSize, String sortBy, String sortDir);

	PageableResponse<ProductDto> getAllLive(int pageNumber, int pageSize, String sortBy, String sortDir);

	PageableResponse<ProductDto> searchByTitle(String subTitle, int pageNumber, int pageSize, String sortBy,
			String sortDir);
	
	// add Product to a particular category
	ProductDto createWithCategory(ProductDto productDto , String  categoryId);

	
	ProductDto updateCategory(String productId, String categoryId);

	PageableResponse<ProductDto> getAllProductOfCategoryId(String categoryId, int pageNumber, int pageSize,
			String sortBy, String sortDir);


	
	
}
