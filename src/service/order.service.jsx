import { privateAxios } from "./axios.service";
// all the service related to order

// getAllOrders
export const getAllOrders = async (pageNumber , pageSize , sortBy , sortDir) => {
  let response = await privateAxios.get(`/order?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return response.data;
};

// deleteOrder
export const deleteOrder = async(orderId) => {
  let response = await privateAxios.delete(`/order/${orderId}`);
  return response.data;
};

// UpdateOrder
export const updateOrder = async(orderId, orderData) => {
  let response = await privateAxios.put(`/order/${orderId}`, orderData);
  return response.data;
};

// createOrder
export const createOrder = async(data) => {
  let resp =  await privateAxios.post(`/order/`, data);
  return resp.data;
};

// getOrderOfParticularUser
export const getOrderOfUser = (userId) => {
  return privateAxios.get(`/order/users/${userId}`).then((resp) => resp.data);
};
