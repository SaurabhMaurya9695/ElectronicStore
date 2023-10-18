import { privateAxios } from "./axios.service";
// all the service related to order

// getAllOrders
export const getAllOrders = async (pageNumber , pageSize , sortBy , sortDir) => {
  let response = await privateAxios.get(`/order?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return response.data;
};

// deleteOrder
export const deleteOrder = (orderId) => {
  return privateAxios.delete(`/order/${orderId}`).then((resp) => resp.data);
};

// UpdateOrder
export const updateOrder = (orderId, data) => {
  return privateAxios.put(`/order/${orderId}`, data).then((resp) => resp.data);
};

// createOrder
export const createOrder = (data) => {
  return privateAxios.post(`/order`, data).then((resp) => resp.data);
};

// getOrderOfParticularUser
export const getUsersOrder = (userId) => {
  return privateAxios.get(`/order/orders/${userId}`).then((resp) => resp.data);
};
