package com.store.dto;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

//here in this entities replaced entities with dto's only
public class CartDto {
	private String cartId;
	private Date createdDate;
	private UserDto user;
	private List<CartItemDto> cartItems = new ArrayList<>();

	public CartDto(String cartId, Date createdDate, UserDto user, List<CartItemDto> cartItems) {
		super();
		this.cartId = cartId;
		this.createdDate = createdDate;
		this.user = user;
		this.cartItems = cartItems;
	}

	public CartDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public UserDto getUser() {
		return user;
	}

	public void setUser(UserDto user) {
		this.user = user;
	}

	public List<CartItemDto> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItemDto> cartItems) {
		this.cartItems = cartItems;
	}

}
