import { privateAxios } from "./axios.service";

export const createProductWithoutCategory = (product) => {
  return privateAxios
    .post("/products/", product)
    .then((response) => response.data);
};
export const createProductWithCategory = (product, categoryId) => {
  return privateAxios
    .post(`/products/addWithcategory/${categoryId}`, product)
    .then((response) => response.data);
};
export const AddProductImage = (productId, file) => {
  const formData = new FormData();
  formData.append("productImg", file); // append as key value pair .. key should be same as backend
  return privateAxios
    .post(`/products/image/${productId}`, formData)
    .then((response) => response.data);
};

export const getAllproduct = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "addedDate",
  sortDir = "asc"
) => {
  return privateAxios
    .get(
      `/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    )
    .then((response) => response.data);
};


export const deleteSingleProduct = (productId) =>{
  return privateAxios.delete(`/products/${productId}`).then((response)=> response.data);
}

export const updateProduct = (data , productId) =>{
  return privateAxios.put(`/products/${productId}`, data).then((response)=> response.data);
}