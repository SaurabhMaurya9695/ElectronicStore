import { privateAxios } from "./axios.service"

export const addCategory = (categories)=>{
    return privateAxios.post(`/categories/` , categories).then((response) => response.data);
}

export const getAllCategory = ()=>{
    return privateAxios.get(`/categories`).then((response) => response.data);
}

export const deleteCategory = (userId) =>{
    return privateAxios.delete(`/categories/${userId}`).then((response) => response.data);
}

export const updateCategories = (category) =>{
    return privateAxios.put(`/categories/${category.categoryId}` , category).then((response) => response.data);
}