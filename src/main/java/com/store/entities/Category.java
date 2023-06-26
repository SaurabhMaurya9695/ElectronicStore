package com.store.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "categories")
public class Category {
	@Id
	@Column(name = "cId")
	private String categoryId;
	@Column(name = "category_title", length = 60, nullable = false)
	private String title;
	@Column(name = "category_desc", length = 50)
	private String discription;
	private String coverImage;

	// creating relationship

	// when we delete cat then its product also delete -> CascadeType.ALL
	// when we fetch category then its product is fetched on demand ->
	// FetchType.LAZY
	// when we run the application then for no creation of extra table we use
	// mappedBy

	@OneToMany(mappedBy = "category", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<Product> products = new ArrayList<>();

	public Category() {
		super();
	}

	public Category(String categoryId, String title, String discription, String coverImage) {
		super();
		this.categoryId = categoryId;
		this.title = title;
		this.discription = discription;
		this.coverImage = coverImage;
	}

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

}
