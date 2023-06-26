package com.store.entities;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "orders")
public class Order {

	@Id
	private String orderId;

	// PENDING,DISPATCH,NOT_DELIVERED , DELIVERED
	private String orderStatus;

	private String payementStatus;

	private int orderAmount;

	@Column(length = 1000)
	private String billingAddress;

	private String billingPhone;

	private String billingName;

	private Date orderedDate;

	private Date deliveredDate;

	// who placed this order
	// fetch = FetchType.EAGER -> if you fetch user, then you get the information of
	// user only
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "user_id")
	private User user;

	// fetch = FetchType.EAGER -> if you fetch order, then you get the information
	// with items
	// cascade = CascadeType.ALL -> if you save order then its items automatically
	// saved and for removed also
	@OneToMany(mappedBy = "order", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private List<OrderItems> orderItems = new ArrayList<>();

	public Order(String orderId, String orderStatus, String payementStatus, int orderAmount, String billingAddress,
			String billingPhone, String billingName, Date orderedDate, Date deliveredDate, User user,
			List<OrderItems> orderItems) {
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
		this.user = user;
		this.orderItems = orderItems;
	}

	public Order() {
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<OrderItems> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItems> orderItems) {
		this.orderItems = orderItems;
	}

}
