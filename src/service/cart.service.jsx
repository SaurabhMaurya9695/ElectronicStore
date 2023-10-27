import { privateAxios, publicAxios } from "./axios.service";

export const getUserCart = async (userId) => {
  let resp = await publicAxios.get(`/carts/${userId}`);
  return resp.data;
};

export const addItemsToCart = async (userId, quantity, productId) => {
  const obj = {
    quantity: quantity ,
    productId: `${productId}`,
  };
  // console.log(obj);
  let resp = await privateAxios.post(`/carts/${userId}`, obj);
  return resp.data;
};

export const clearUserCart = async (userId) => {
  let resp = await privateAxios.delete(`/carts/${userId}`);
  return resp.data;
};

export const removeItemsfromUserCart = (userId, cartItemId) => {
  return privateAxios
    .delete(`/carts/${userId}/items/${cartItemId}`)
    .then((resp) => resp.data);
};
