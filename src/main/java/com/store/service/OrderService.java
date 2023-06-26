package com.store.service;

import java.util.List;

import com.store.dto.CreateOrderRequest;
import com.store.dto.OrderDto;
import com.store.dto.PageableResponse;
import com.store.dto.UpdateOrder;

public interface OrderService {

	// 1 - create Order
	// we have to accept order and who is creating the order means userId
//	OrderDto createOrder(OrderDto orderDto, String userId , String cartId);
	
	OrderDto createOrder(CreateOrderRequest createOrderRequest);

	// 2 - removeOrder
	void removeOrder(String orderId);

	// 3 - getOrdersofUser
	List<OrderDto> getOrdersofUser(String userId);

	// 4 - getOrder
	PageableResponse<OrderDto> getAllOrders(int pageNumber, int pageSize, String sortBy, String dir);

	OrderDto updateOrder(UpdateOrder newOrder, String orderId);

	// other api's of orders
}
