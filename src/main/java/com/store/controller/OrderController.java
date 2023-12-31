package com.store.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.CreateOrderRequest;
import com.store.dto.OrderDto;
import com.store.dto.PageableResponse;
import com.store.dto.UpdateOrder;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.impl.OrderServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/order")
@CrossOrigin
@SecurityRequirement(name = "bearerAuth")
public class OrderController {

	@Autowired
	private OrderServiceImpl orderService;

	// Create
	@Operation(summary = "create Order EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PostMapping("/")
	public ResponseEntity<OrderDto> createOrder(@RequestBody @Valid CreateOrderRequest createOrderRequest) {
		System.out.println(createOrderRequest.getBillingName());
		OrderDto order = this.orderService.createOrder(createOrderRequest);
		return new ResponseEntity<>(order, HttpStatus.CREATED);
	}

	@Operation(summary = "Update Order EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@PutMapping("/{orderId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<OrderDto> updateOrder(@RequestBody @Valid UpdateOrder req, @PathVariable String orderId) {
		OrderDto order = this.orderService.updateOrder(req, orderId);
		return new ResponseEntity<>(order, HttpStatus.CREATED);
	}

	// remove Order
	@Operation(summary = "remove Order EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@DeleteMapping("/{orderId}")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<ApiResponseMessage> removeOrder(@PathVariable String orderId) {
		this.orderService.removeOrder(orderId);
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
		apiResponseMessage.setCode(HttpStatus.OK);
		apiResponseMessage.setMessage("Your Order Deleted Successfully");
		apiResponseMessage.setSuccess(true);

		return new ResponseEntity<>(apiResponseMessage, apiResponseMessage.getCode());
	}

	@Operation(summary = "get Order of user EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping("/users/{userId}")
	public ResponseEntity<List<OrderDto>> getOrdersofUser(@PathVariable("userId") String userId) {
		List<OrderDto> orders = this.orderService.getOrdersofUser(userId);
		return new ResponseEntity<List<OrderDto>>(orders, HttpStatus.OK);
	}

	@Operation(summary = "get All Order EndPoint", responses = {
			@ApiResponse(responseCode = "200", description = "Success"),
			@ApiResponse(responseCode = "403", description = "Unauthorized / Invalid Token"), })
	@GetMapping()
	public ResponseEntity<PageableResponse<OrderDto>> getAllOrders(
			@RequestParam(value = "pageNumber", defaultValue = "0", required = false) int pageNumber,
			@RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
			@RequestParam(value = "sortBy", defaultValue = "orderedDate", required = false) String sortBy,
			@RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
		PageableResponse<OrderDto> response = this.orderService.getAllOrders(pageNumber, pageSize, sortBy, sortDir);
		return new ResponseEntity<PageableResponse<OrderDto>>(response, HttpStatus.OK);
	}
	
	

}
