package com.store.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CategoryDto {
	private String categoryId;
	
	@NotBlank
	@NotNull
	@Size(min = 4 , max = 10 , message = "Minimum 4 char required and max 10 required in title ")
	private String title;
	
	@NotBlank(message = "Desc Can't be Null")
	private String discription;
	
	@NotBlank(message = "CoverImg Can't be Null")
	private String coverImage;
	
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDiscription() {
		return discription;
	}
	public void setDiscription(String discription) {
		this.discription = discription;
	}
	public String getCoverImage() {
		return coverImage;
	}
	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}
	public CategoryDto(String categoryId, String title, String discription, String coverImage) {
		super();
		this.categoryId = categoryId;
		this.title = title;
		this.discription = discription;
		this.coverImage = coverImage;
	}
	public CategoryDto() {
		super();
		
	}
	
	
}
