package com.store.dto;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

public class OrderDto {

	private String orderId;
	private String orderStatus = "PENDING"; // bydefault we set as Pending
	private String payementStatus = "NOTPAID";
	private int orderAmount;
	private String billingAddress;
	private String billingPhone;
	private String billingName;
	private Date orderedDate = new Date() ;
	private Date deliveredDate;
//	private UserDto user;
	private List<OrderItemsDto> orderItems = new ArrayList<>();

	public OrderDto(String orderId, String orderStatus, String payementStatus, int orderAmount, String billingAddress,
			String billingPhone, String billingName, Date orderedDate, Date deliveredDate,
			List<OrderItemsDto> orderItems) {
		super();
		this.orderId = orderId;
		this.orderStatus = orderStatus;
		this.payementStatus = payementStatus;
		this.orderAmount = orderAmount;
		this.billingAddress = billingAddress;
		this.billingPhone = billingPhone;
		this.billingName = billingName;
		this.orderedDate = orderedDate;
		this.deliveredDate = deliveredDate;
		this.orderItems = orderItems;
	}

	public OrderDto() {
		super();
		// TODO Auto-generated constructor stub
	}

	public String getOrderId() {
		return orderId;
	}

	public void setOrderId(String orderId) {
		this.orderId = orderId;
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

	public int getOrderAmount() {
		return orderAmount;
	}

	public void setOrderAmount(int orderAmount) {
		this.orderAmount = orderAmount;
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

	public Date getOrderedDate() {
		return orderedDate;
	}

	public void setOrderedDate(Date orderedDate) {
		this.orderedDate = orderedDate;
	}

	public Date getDeliveredDate() {
		return deliveredDate;
	}

	public void setDeliveredDate(Date deliveredDate) {
		this.deliveredDate = deliveredDate;
	}

	public List<OrderItemsDto> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItemsDto> orderItems) {
		this.orderItems = orderItems;
	}

}
