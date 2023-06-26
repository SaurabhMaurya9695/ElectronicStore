package com.store.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItems {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int orderItemId;
	
	private int quantity;
	
	private int totalprice;
	
	@OneToOne
	@JoinColumn(name = "product_id")
	private Product product ;
	
	@ManyToOne
	@JoinColumn(name = "order_id")
	private Order order ;
	

	public OrderItems(int orderItemId, int quantity, int totalprice, Product product, Order order) {
		super();
		this.orderItemId = orderItemId;
		this.quantity = quantity;
		this.totalprice = totalprice;
		this.product = product;
		this.order = order;
	}

	public OrderItems() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getOrderItemId() {
		return orderItemId;
	}

	public void setOrderItemId(int orderItemId) {
		this.orderItemId = orderItemId;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(int totalprice) {
		this.totalprice = totalprice;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}
	
	

}
