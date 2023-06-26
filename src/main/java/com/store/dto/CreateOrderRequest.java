package com.store.dto;

import jakarta.validation.constraints.NotBlank;

public class CreateOrderRequest {
	
	@NotBlank(message = "CartId is required")
	private String cartId;
	
	@NotBlank(message = "userId is required")
	private String userId;
	private String orderStatus = "PENDING"; // bydefault we set as Pending
	private String payementStatus = "NOTPAID";
	
	@NotBlank(message = "BillingAddress is required")
	private String billingAddress;
	
	@NotBlank(message = "BillingPhone  is required")
	private String billingPhone;
	
	@NotBlank(message = "BillingName  is required")
	private String billingName;

	public CreateOrderRequest() {
		super();
		// TODO Auto-generated constructor stub
	}

	public CreateOrderRequest(String cartId, String userId, String orderStatus, String payementStatus,
			String billingAddress, String billingPhone, String billingName) {
		super();
		this.cartId = cartId;
		this.userId = userId;
		this.orderStatus = orderStatus;
		this.payementStatus = payementStatus;
		this.billingAddress = billingAddress;
		this.billingPhone = billingPhone;
		this.billingName = billingName;
	}

	public String getCartId() {
		return cartId;
	}

	public void setCartId(String cartId) {
		this.cartId = cartId;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getPayementStatus() {
		return payementStatus;
	}

	public void setPayementStatus(String payementStatus) {
		this.payementStatus = payementStatus;
	}

	public String getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getBillingPhone() {
		return billingPhone;
	}

	public void setBillingPhone(String billingPhone) {
		this.billingPhone = billingPhone;
	}

	public String getBillingName() {
		return billingName;
	}

	public void setBillingName(String billingName) {
		this.billingName = billingName;
	}

}
