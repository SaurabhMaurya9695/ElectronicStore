package com.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.AddItemToCartRequest;
import com.store.dto.CartDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.CartService;

@RestController
@RequestMapping("/carts")
public class CartController {

	@Autowired
	private CartService cartService;

	// 1 - AddItemtoCart
	@PostMapping("/{userId}")
	public ResponseEntity<CartDto> addItemToCart(@PathVariable String userId,
			@RequestBody AddItemToCartRequest addItemToCartRequest) {

		CartDto cartDto = cartService.addItemToCart(userId, addItemToCartRequest);

		return new ResponseEntity<>(cartDto, HttpStatus.CREATED);
	}

	// 2 - remove Items From The cart ;
	@DeleteMapping("/{userId}/items/{cartItemId}")
	public ResponseEntity<ApiResponseMessage> removeItemFromCart(@PathVariable String userId,
			@PathVariable int cartItemId) {
		cartService.removeItemFromCart(userId, cartItemId);
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
		apiResponseMessage.setCode(HttpStatus.OK);
		apiResponseMessage.setMessage("Item has been removed from the cart ");
		apiResponseMessage.setSuccess(true);
		return new ResponseEntity<>(apiResponseMessage, apiResponseMessage.getCode());
	}

	// 3 - clear the cart
	@DeleteMapping("/{userId}")
	public ResponseEntity<ApiResponseMessage> clearCart(@PathVariable String userId) {
		cartService.clearCart(userId);
		ApiResponseMessage apiResponseMessage = new ApiResponseMessage();
		apiResponseMessage.setCode(HttpStatus.OK);
		apiResponseMessage.setMessage("cart has been clear ");
		apiResponseMessage.setSuccess(true);
		return new ResponseEntity<>(apiResponseMessage, apiResponseMessage.getCode());
	}

	// 4 - get card;
	@GetMapping("/{userId}")
	public ResponseEntity<CartDto> getCart(@PathVariable String userId) {

		CartDto cartDto = cartService.getCartByUser(userId);
		return new ResponseEntity<>(cartDto, HttpStatus.CREATED);
	}
}
