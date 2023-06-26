package com.store.entities;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart")
public class Cart {

	@Id
	private String cartId;
	private Date createdDate;

	// whose cart is this ;
	// one cart has only one user
	@OneToOne
	private User user;

	// number of items
	// one cart has many items -> from this side , unidirectonal
	// CascadeType.ALL -> we want to save cart then its items automatically save
	// FetchType.Eager -> if we want cart then its items come along ;
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, fetch = FetchType.EAGER , orphanRemoval = true)
	private List<CartItem> cartItems = new ArrayList<>();

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Cart(String cartId, Date createdDate, User user, List<CartItem> cartItems) {
		super();
		this.cartId = cartId;
		this.createdDate = createdDate;
		this.user = user;
		this.cartItems = cartItems;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<CartItem> getCartItems() {
		return cartItems;
	}

	public void setCartItems(List<CartItem> cartItems) {
		this.cartItems = cartItems;
	}

}
