import { publicAxios } from "./axios.service";

export const registerUser = (userData) => {
  return publicAxios
    .post(`/users/`, userData)
    .then((response) => response.data);
};

export const LoginUser = (userData) => {
  return publicAxios
    .post(`/auth/login`, userData)
    .then((response) => response.data);
};


export const getSingleUserData = (userId) =>{
  return publicAxios.get(`/users/${userId}`).then((response) => response.data);
}

export const serveImage = (userId) =>{
  return publicAxios.get(`/users/image/${userId}`).then((response) => response.data);
}
