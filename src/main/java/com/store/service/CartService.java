package com.store.service;

import com.store.dto.AddItemToCartRequest;
import com.store.dto.CartDto;

public interface CartService {
	// add item to cart
	// case 1 : if cart is not available then create a cart then add items
	// case 2 : if available then directly add in cart
	// case 3 : if item is already available then it will automatically update the cart
	
	CartDto addItemToCart(String userId ,AddItemToCartRequest request) ;
	
	
	//remove items from cart
	void removeItemFromCart(String userId , int cartItem) ;
	
	//remove all items from cart for that we need userId;
	void clearCart(String userId);
	
	
	//get all the cart of particular user ;
	CartDto getCartByUser(String UserId) ;
	
	
	
}
