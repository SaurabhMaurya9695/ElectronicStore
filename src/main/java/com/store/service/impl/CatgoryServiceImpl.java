package com.store.service.impl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.NoSuchFileException;
import java.nio.file.Path;
import java.nio.file.Paths;
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

import com.store.dto.CategoryDto;
import com.store.dto.PageableResponse;
import com.store.entities.Category;
import com.store.exceptions.ResourceNotFoundException;
import com.store.helper.Helper;
import com.store.repository.CategoryRepository;
import com.store.service.CategoryService;

@Service
public class CatgoryServiceImpl implements CategoryService {
	@Autowired
	private CategoryRepository categoryRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Value("${categories.profile.image.path}")
	private String imagePathForcat;
	
	private String CATEXE = "Category Not exist with this id";

	private Logger logger = LoggerFactory.getLogger(CatgoryServiceImpl.class);

	@Override
	public CategoryDto createCat(CategoryDto categoryDto) {

		// we have to generate manullay its id ;

		String id = UUID.randomUUID().toString();
		categoryDto.setCategoryId(id);

		Category convertedDto = modelMapper.map(categoryDto, Category.class);
		Category savedcat = this.categoryRepository.save(convertedDto);
		CategoryDto saved = modelMapper.map(savedcat, CategoryDto.class);
		return saved;
	}

	@Override
	public void deleteCat(String catId) {
		Category category = this.categoryRepository.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException(CATEXE));

		// before deleteing the user we have to delete the imgage also
		String fullPath = imagePathForcat + category.getCoverImage(); // image/user/abc.png

		Path path = Paths.get(fullPath);
		try {
			Files.delete(path);
		} catch (NoSuchFileException ex) {
			logger.info("File Not Found in Folder");
			ex.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		this.categoryRepository.delete(category);

	}

	@Override
	public CategoryDto getSingleCat(String catId) {
		Category cat = this.categoryRepository.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException(CATEXE));
		return modelMapper.map(cat, CategoryDto.class);
	}

	@Override
	public PageableResponse<CategoryDto> getAllCat(int pageNumber, int pageSize, String sortBy, String sortDir) {
		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		// pageNumber starts from zero
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Category> page = this.categoryRepository.findAll(pageable);
		PageableResponse<CategoryDto> resp = Helper.getpageableResponse(page, CategoryDto.class);
		return resp;
	}

	@Override
	public CategoryDto updatedCat(CategoryDto categoryDto, String catId) {
		Category category = this.categoryRepository.findById(catId)
				.orElseThrow(() -> new ResourceNotFoundException(CATEXE));
		// update cat details
		category.setCoverImage(categoryDto.getCoverImage());
		category.setDiscription(categoryDto.getDiscription());
		category.setTitle(categoryDto.getTitle());
		// id we don't have to set beacuse we are changing the content not id ;
		Category savedCat = this.categoryRepository.save(category);
		return modelMapper.map(savedCat, CategoryDto.class);
	}

}
