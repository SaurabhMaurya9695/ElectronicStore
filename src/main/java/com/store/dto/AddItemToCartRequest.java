package com.store.dto;

public class AddItemToCartRequest {
	private int quantity;
	private String productId;

	public AddItemToCartRequest(int quantity, String productId) {
		super();
		this.quantity = quantity;
		this.productId = productId;
	}

	public AddItemToCartRequest() {
		super();
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

}
