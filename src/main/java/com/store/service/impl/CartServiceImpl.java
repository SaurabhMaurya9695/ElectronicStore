package com.store.service.impl;

import java.util.Date;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.store.dto.AddItemToCartRequest;
import com.store.dto.CartDto;
import com.store.entities.Cart;
import com.store.entities.CartItem;
import com.store.entities.Product;
import com.store.entities.User;
import com.store.exceptions.BadApiRequestException;
import com.store.exceptions.ResourceNotFoundException;
import com.store.repository.CartItemRepository;
import com.store.repository.CartRepository;
import com.store.repository.ProductRepository;
import com.store.repository.UserRepository;
import com.store.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ModelMapper modelMapper;

	private static final Logger logger = LoggerFactory.getLogger(CartServiceImpl.class);

	@Autowired
	private CartItemRepository cartItemRepository;

	@Override
	public CartDto addItemToCart(String userId, AddItemToCartRequest request) {
		String pid = request.getProductId();
		int quantity = request.getQuantity();

		if (quantity <= 0) {
			throw new BadApiRequestException("Requested quantity is not valid");
		}

		// we have to fetch the product now;
		Product fetchedProduct = this.productRepository.findById(pid)
				.orElseThrow(() -> new ResourceNotFoundException("product Not found with this id!!"));

		// before adding in cart we have to make sure we have that cart;
		User fetchedUser = this.userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User Not found!!"));

		// now check whether this user has cart or not .. if not then create a new cart
		// otherwise add in existing cart
		Cart cart = null;
		try {
			// if we able to get the cart
			cart = this.cartRepository.findByUser(fetchedUser).get();
		} catch (NoSuchElementException ex) {
			// now we have to create a cart ;
			logger.info("CREATING NEW CART ");
			cart = new Cart();
			cart.setCartId(UUID.randomUUID().toString());
			cart.setCreatedDate(new Date());
			// then add product
		}

		AtomicReference<Boolean> isCartUpdated = new AtomicReference<>(false); // we can't add use in map so for that we
																				// use this..
		// perform operation on cart now
		List<CartItem> itemsInsideCart = cart.getCartItems(); // it can be zero if we added first or already some atom
																// inside this .
		// if our cart available from before then its size > 0 otherwise size == 0 ;
		// if itemsInsideCart item is already present then just increase the quantity
		// and price otherwise insert product
		List<CartItem> updatedItems = itemsInsideCart.stream().map(items -> {
			if (items.getProduct().getpId().equals(pid)) {
				// means item already present;
				items.setQuantity(quantity);
				items.setTotalPrice(quantity * fetchedProduct.getDiscounted_price());
				isCartUpdated.set(true);
			}
			return items;
		}).collect(Collectors.toList());

		CartItem cartItem = new CartItem();
		if (!isCartUpdated.get()) {
			// now we have to set cartItem insideCart
			cartItem.setQuantity(quantity); // coming from up ;
			cartItem.setTotalPrice(quantity * fetchedProduct.getDiscounted_price());
			cartItem.setCart(cart);
			cartItem.setProduct(fetchedProduct);

		}

		if (isCartUpdated.get() == true) {
			// means we updated the cartItems
			// if we updated then add the new updated List
			cart.setCartItems(updatedItems);
		} else {
			// we created a new cart .. then add in its cart list
			cart.getCartItems().add(cartItem);
		}

		cart.setUser(fetchedUser);
		// now we are ready to save in db
		Cart savedCartinDb = this.cartRepository.save(cart);

		return modelMapper.map(savedCartinDb, CartDto.class);
	}

	@Override
	public void removeItemFromCart(String userId, int cartItem) {
		CartItem cartItems = cartItemRepository.findById(cartItem)
				.orElseThrow(() -> new ResourceNotFoundException("CartItem doesn't exist!!"));
		cartItemRepository.delete(cartItems);

	}

	@Override
	public void clearCart(String userId) {
		User user = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User NOt found With this ID"));

		//if you have user then check user has cart ;
		Cart cart = cartRepository.findByUser(user)
				.orElseThrow(() -> new ResourceNotFoundException("User doesn't have cart"));

		// if he has cart then clear;
		// you  are removing the data from cart for that we have to use orphangRemoval = true;
		cart.getCartItems().clear();

		//after clearning you can clear

		cartRepository.save(cart);

	}

	@Override
	public CartDto getCartByUser(String UserId) {
		User user = userRepository.findById(UserId)
				.orElseThrow(() -> new ResourceNotFoundException("User NOt found With this ID"));

//		if we have User then check for cart .
		Cart cart = cartRepository.findByUser(user)
				.orElseThrow(() -> new ResourceNotFoundException("User doesn't have cart"));

		return modelMapper.map(cart, CartDto.class);
	}

}
