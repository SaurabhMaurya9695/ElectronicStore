package com.store.dto;

import java.util.Date;

import jakarta.validation.constraints.NotBlank;

public class UpdateOrder {
	private String orderStatus ;
	private String payementStatus ;

	@NotBlank(message = "BillingAddress is required")
	private String billingAddress;

	@NotBlank(message = "BillingPhone  is required")
	private String billingPhone;

	@NotBlank(message = "BillingName  is required")
	private String billingName;

	private Date deliveredDate ;
	
	public Date getDeliveredDate() {
		return deliveredDate;
	}

	public void setDeliveredDate(Date deliveredDate) {
		this.deliveredDate = deliveredDate;
	}

	public UpdateOrder() {
		super();
		// TODO Auto-generated constructor stub
	}

	public UpdateOrder(String orderStatus, String payementStatus,
			@NotBlank(message = "BillingAddress is required") String billingAddress,
			@NotBlank(message = "BillingPhone  is required") String billingPhone,
			@NotBlank(message = "BillingName  is required") String billingName) {
		super();
		this.orderStatus = orderStatus;
		this.payementStatus = payementStatus;
		this.billingAddress = billingAddress;
		this.billingPhone = billingPhone;
		this.billingName = billingName;
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
