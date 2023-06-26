package com.store.dto;

public class CartItemDto {

	private int cartItemId;
	private ProductDto product;
	private int quantity;
	private int totalPrice;

	public CartItemDto(int cartItemId, ProductDto product, int quantity, int totalPrice) {
		super();
		this.cartItemId = cartItemId;
		this.product = product;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
	}

	public CartItemDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(int cartItemId) {
		this.cartItemId = cartItemId;
	}

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(int totalPrice) {
		this.totalPrice = totalPrice;
	}

}
