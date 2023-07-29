package com.store.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "cart_items")
public class CartItem {

	// it help us to manage relationship betweeen cart and product
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int cartItemId;

	// now doing mapping with product
	@OneToOne
	@JoinColumn(name = "product_id")
	private Product product;
	private int quantity;
	private int totalPrice;

	// doing mapping with cart
	@ManyToOne(fetch = FetchType.LAZY) // we want only items of cart not whole cart
	@JoinColumn(name = "cart_id")
	private Cart cart;

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CartItem(int cartItemId, Product product, int quantity, int totalPrice, Cart cart) {
		super();
		this.cartItemId = cartItemId;
		this.product = product;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.cart = cart;
	}

	public int getCartItemId() {
		return cartItemId;
	}

	public void setCartItemId(int cartItemId) {
		this.cartItemId = cartItemId;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
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

	public Cart getCart() {
		return cart;
	}

	public void setCart(Cart cart) {
		this.cart = cart;
	}

}
