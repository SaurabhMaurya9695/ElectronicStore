import { privateAxios } from "./axios.service"

export const addCategory = (categories)=>{
    return privateAxios.post(`/categories/` , categories).then((response) => response.data);
}