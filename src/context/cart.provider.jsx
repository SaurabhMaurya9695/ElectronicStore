import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import CartContext from "../context/cart.context";
import {
  addItemsToCart,
  clearUserCart,
  getUserCart,
  removeItemsfromUserCart,
} from "../service/cart.service";
import UserContext from "./user.context";
import Swal from "sweetalert2";
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const { isLogin, userData } = useContext(UserContext);
  const ID = userData?.userDto?.userId;

  useEffect(() => {
    if (isLogin) {
      //then get userCart ;
      getUserCartLocally(userData?.userDto?.userId);
    }
  }, [isLogin]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItemToCartLocally = async (quantity, productId , title) => {
    try {
      if(!isLogin){
        Swal.fire({
          icon: 'error',
          text: 'You Are Not LoggedIn !',
          footer: `<a href="/login">Login Here</a>`
        })
      }
      console.log(ID + " " +  quantity + " " +  productId)
      let data = await addItemsToCart(ID, quantity, productId);
      console.log(data);
      setCart({ ...data });
      if(quantity === 1){
        toast.success(`${title} Added To cart with ${quantity} Quantity ` ,{position:"bottom-center" , closeOnClick:true})
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In Adding Items To Cart");
    }
  };

  // remove items from cart
  const removeItemsfromUserCartLocally = (cartItemsId) => {
    removeItemsfromUserCart(ID, cartItemsId)
      .then((resp) => {
        console.log("resp");
        const newCart = cart.cartItems.filter((items) => items.cartItemId !== cartItemsId);
        // those items which's items id is not equal to current Removing cartID
        setCart({ ...cart, cartItems: newCart });
        toast.success("Successfully Removed From Cart");
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error in removing From Cart");
      });
  };

  //clear the cart
  const clearCart = async () => {
    try {
      const data = await clearUserCart(ID);
      console.log(data);
      setCart({ ...cart, cartItems: [] });
    } catch (error) {
      console.log(error);
      toast.error("Error In Clearing the Cart");
    }
  };

  const getUserCartLocally = async (userId) => {
    try {
      let resp = await getUserCart(userId);
      console.log(resp);
      setCart({ ...resp });
    } catch (e) {
      console.log(e);
      setCart({ cartItems: [] });
      toast.error("cart Not Found");
    }
  };

  useEffect(() => {}, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addItemToCartLocally,
        removeItemsfromUserCartLocally,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
