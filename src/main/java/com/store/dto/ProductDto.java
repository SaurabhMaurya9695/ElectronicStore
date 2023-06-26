package com.store.dto;

import java.util.Date;

import com.store.entities.Category;

public class ProductDto {

	private String pId;
	private String title;
	private String discription;
	private int price;
	private int discounted_price;
	private int quantity;
	private Date addedDate;
	private boolean isLive;
	private boolean stock;
	private String productImageName;
	private Category category ;
	

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public ProductDto() {
		super();
	}

	public ProductDto(String pId, String title, String discription, int price, int discounted_price, int quantity,
			Date addedDate, boolean isLive, boolean stock) {
		super();
		this.pId = pId;
		this.title = title;
		this.discription = discription;
		this.price = price;
		this.discounted_price = discounted_price;
		this.quantity = quantity;
		this.addedDate = addedDate;
		this.isLive = isLive;
		this.stock = stock;
	}

	

	public String getProductImageName() {
		return productImageName;
	}

	public void setProductImageName(String productImageName) {
		this.productImageName = productImageName;
	}

	public String getpId() {
		return pId;
	}

	public void setpId(String pId) {
		this.pId = pId;
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

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}

	public int getDiscounted_price() {
		return discounted_price;
	}

	public void setDiscounted_price(int discounted_price) {
		this.discounted_price = discounted_price;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Date getAddedDate() {
		return addedDate;
	}

	public void setAddedDate(Date addedDate) {
		this.addedDate = addedDate;
	}

	public boolean isLive() {
		return isLive;
	}

	public void setLive(boolean isLive) {
		this.isLive = isLive;
	}

	public boolean isStock() {
		return stock;
	}

	public void setStock(boolean stock) {
		this.stock = stock;
	}

}
