package com.store.service.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.Date;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.store.dto.CreateOrderRequest;
import com.store.dto.OrderDto;
import com.store.dto.PageableResponse;
import com.store.dto.UpdateOrder;
import com.store.entities.Cart;
import com.store.entities.CartItem;
import com.store.entities.Order;
import com.store.entities.OrderItems;
import com.store.entities.User;
import com.store.exceptions.BadApiRequestException;
import com.store.exceptions.ResourceNotFoundException;
import com.store.helper.Helper;
import com.store.repository.CartRepository;
import com.store.repository.OrderRepository;
import com.store.repository.UserRepository;
import com.store.service.OrderService;

@Service
public class OrderServiceImpl implements OrderService {

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ModelMapper modelMapper;

	private static final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

	@Override
	public OrderDto createOrder(CreateOrderRequest orderDto) {

		String userId = orderDto.getUserId();
		String cartId = orderDto.getCartId();

		// 1 - before generating the order you have to fetch the user ;
		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not Found with given id !!"));

		// 2 - fetch cart of cartId
		Cart cart = this.cartRepository.findById(cartId)
				.orElseThrow(() -> new ResourceNotFoundException("Cart doesn't exist with this Id"));

		// 3 - now convert all cartItem into order
		List<CartItem> cartItems = cart.getCartItems();

		if (cartItems.size() <= 0) {
			throw new BadApiRequestException("Invalid Number of Items Present in Cart !!..");
		}

		// 4 - now create Order
		Order order = new Order();
		order.setBillingAddress(orderDto.getBillingAddress());
		order.setBillingName(orderDto.getBillingName());
		order.setBillingPhone(orderDto.getBillingPhone());
		order.setOrderStatus(orderDto.getOrderStatus());
		order.setPayementStatus(orderDto.getPayementStatus());
		order.setDeliveredDate(null);
		order.setOrderedDate(new Date());
		order.setOrderId(UUID.randomUUID().toString());
		order.setUser(user);

		// 5 - add in orderItems and above we left with setting orderAmount , quantity
		AtomicReference<Integer> orderAmount = new AtomicReference<>(0); // by default value is zero;

		List<OrderItems> AllorderItems = cartItems.stream().map((items) -> {

			OrderItems orderItems = new OrderItems();
			orderItems.setQuantity(items.getQuantity());
			orderItems.setProduct(items.getProduct());
			orderItems.setTotalprice(items.getQuantity() * items.getProduct().getDiscounted_price());
			orderItems.setOrder(order);
			orderAmount.set(orderAmount.get() + orderItems.getTotalprice());

			return orderItems;
		}).collect(Collectors.toList());

		order.setOrderItems(AllorderItems);
		order.setOrderAmount(orderAmount.get());

		// 6 - now clear the cart ;
		cart.getCartItems().clear();
		this.cartRepository.save(cart);
		Order savedOrder = this.orderRepository.save(order);
		return modelMapper.map(savedOrder, OrderDto.class);
	}

	
	@Override
	public OrderDto updateOrder(UpdateOrder newOrder , String orderId) {
		Order order = this.orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not found With this id!!"));
		
		// now update all things
		order.setBillingAddress(newOrder.getBillingAddress());
		order.setBillingName(newOrder.getBillingName());
		order.setBillingPhone(newOrder.getBillingPhone());
		order.setOrderStatus(newOrder.getOrderStatus());
		order.setPayementStatus(newOrder.getPayementStatus());
		order.setDeliveredDate(newOrder.getDeliveredDate());
		
		
		Order savedOrder = this.orderRepository.save(order);
		
		log.info("Order Updated!! ");
		
		return modelMapper.map(savedOrder, OrderDto.class);
	}
	
	@Override
	public void removeOrder(String orderId) {
		this.orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found with this Id !!"));
		this.orderRepository.deleteById(orderId);
		log.info("Order Deleted Successfully of OrderId {} : ", orderId);
	}

	@Override
	public List<OrderDto> getOrdersofUser(String userId) {

		User user = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Does'nt fount!!"));
		List<Order> ordersOfUsers = this.orderRepository.findByUser(user);
		List<OrderDto> orderDtoList = ordersOfUsers.stream().map(order -> modelMapper.map(order, OrderDto.class))
				.collect(Collectors.toList());
		return orderDtoList;
	}

	@Override
	public PageableResponse<OrderDto> getAllOrders(int pageNumber, int pageSize, String sortBy, String sortDir) {

		Sort sort = (sortDir.equalsIgnoreCase("asc")) ? (Sort.by(sortBy)) : (Sort.by(sortBy).descending());
		Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);
		Page<Order> page = this.orderRepository.findAll(pageable);
		PageableResponse<OrderDto> resp = Helper.getpageableResponse(page, OrderDto.class);
		return resp;
	}

}
