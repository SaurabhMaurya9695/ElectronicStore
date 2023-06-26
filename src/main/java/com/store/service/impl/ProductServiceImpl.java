package com.store.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.store.dto.PageableResponse;
import com.store.dto.ProductDto;
import com.store.entities.Category;
import com.store.entities.Product;
import com.store.exceptions.ResourceNotFoundException;
import com.store.helper.Helper;
import com.store.repository.CategoryRepository;
import com.store.repository.ProductRepository;
import com.store.service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${products.profile.image.path}")
	private String productImagePath;

	@SuppressWarnings("unused")
	private Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
	@Override
	public ProductDto create(ProductDto data) {

		// generate Random Id ;
		String id = UUID.randomUUID().toString();
		data.setpId(id);

		data.setAddedDate(new Date());

		Product product = modelMapper.map(data, Product.class);
		Product savedProduct = this.productRepository.save(product);
		return modelMapper.map(savedProduct, ProductDto.class);
	}

	@Override
	public ProductDto updateProduct(ProductDto data, String pid) {

		Product product = this.productRepository.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Product With this id not exist"));

		// we need to update data to product ;
		product.setAddedDate(data.getAddedDate());
		product.setDiscounted_price(data.getDiscounted_price());
		product.setDiscription(data.getDiscription());
		product.setLive(data.isLive());
		product.setPrice(data.getPrice());
		product.setQuantity(data.getQuantity());
		product.setStock(data.isStock());
		product.setTitle(data.getTitle());
		product.setProductImageName(data.getProductImageName());

		Product updatedproduct = this.productRepository.save(product);
		return modelMapper.map(updatedproduct, ProductDto.class);
	}

	@Override
	public void delete(String pid) {
		Product product = this.productRepository.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Product With this id not exist"));

		// before deleting we have to delete the image from db also and as well as from
		// folder
		String fullPath = productImagePath + product.getProductImageName(); // image/user/abc.png

		Path path = Paths.get(fullPath);
		try {
			Files.delete(path);
		} catch (NoSuchFileException ex) {
			ex.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		this.productRepository.delete(product);

	}

	@Override
	public ProductDto getById(String pid) {
		Product product = this.productRepository.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("Product With this id not exist"));
		return modelMapper.map(product, ProductDto.class);
	}

	@Override
	public PageableResponse<ProductDto> getAllLive(int pageNumber, int pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Product> page = this.productRepository.findByIsLiveTrue(pageable);
		PageableResponse<ProductDto> resp = Helper.getpageableResponse(page, ProductDto.class);
		return resp;
	}

	@Override
	public PageableResponse<ProductDto> getAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		// pageNumber starts from zero
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Product> page = this.productRepository.findAll(pageable);
		PageableResponse<ProductDto> resp = Helper.getpageableResponse(page, ProductDto.class);
		return resp;
	}

	@Override
	public PageableResponse<ProductDto> searchByTitle(String subTitle, int pageNumber, int pageSize, String sortBy,
			String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Product> page = this.productRepository.findByTitleContaining(subTitle, pageable);
		PageableResponse<ProductDto> resp = Helper.getpageableResponse(page, ProductDto.class);
		return resp;
	}

	@Override
	public ProductDto createWithCategory(ProductDto productDto, String categoryId) {
		// before adding in category we need to check whether the category is exist or
		// not ?

		// so first fetch Category with given id;
		Category catgeory = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException(
						"No category Found with This id , So we can't add product inside this"));

		// we have to do operation in productEntity ;
		Product product = modelMapper.map(productDto, Product.class);

		// we have product now , set his id and save in db ;
		String id = UUID.randomUUID().toString();
		product.setpId(id);
		product.setAddedDate(new Date());
		product.setCategory(catgeory);
		
		// now our product is ready to save in db
		Product savedProduct = this.productRepository.save(product);
		return modelMapper.map(savedProduct, ProductDto.class);
	}

	@Override
	public ProductDto updateCategory(String productId, String categoryId) {
		Product product = this.productRepository.findById(productId)
				.orElseThrow(() -> new ResourceNotFoundException("Product Not Found With this id!!!"));

		Category catgeory = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("No category Found with This id!!.."));

		product.setCategory(catgeory);

		Product updatecategory = this.productRepository.save(product);

		return modelMapper.map(updatecategory, ProductDto.class);
	}

	@Override
	public PageableResponse<ProductDto> getAllProductOfCategoryId(String categoryId, int pageNumber, int pageSize,
			String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

		// first find the product of id then pass id to repo
		Category category = this.categoryRepository.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category Not found with Id!.."));

		Page<Product> page = this.productRepository.findByCategory(category, pageable);

		PageableResponse<ProductDto> resp = Helper.getpageableResponse(page, ProductDto.class);
		return resp;
	}

}
