package com.store.dto;

public class OrderItemsDto {
	private int orderItemId;
	private int quantity;
	private int totalprice;
	private ProductDto product;

	//we don't have to send this so we can remove
	//private Order order ; 
	public OrderItemsDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OrderItemsDto(int orderItemId, int quantity, int totalprice, ProductDto product) {
		super();
		this.orderItemId = orderItemId;
		this.quantity = quantity;
		this.totalprice = totalprice;
		this.product = product;
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

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

}
