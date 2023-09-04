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
