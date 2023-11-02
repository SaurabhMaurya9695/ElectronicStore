import { privateAxios, publicAxios } from "./axios.service";

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


export const updateUser =(user) =>{
  return privateAxios.put(`/users/${user.userId}` , user).then((response) => response.data);
}

//update user Image
export const updateImage = (file , userId) =>{
  if(file == null) return ;
  // we can't send directy as a json ..we have to send as a multipart
  const multiPartData = new FormData();
  multiPartData.append("image" , file);
  return privateAxios.post(`/users/image/${userId}` , multiPartData).then((resp)=>resp.data)
}

export const getAllUser = async(pageNumber , pageSize , sortBy , sortDir) =>{
    let response = await privateAxios.get(`/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`);
  return response.data;
};

export const searchUser = (keyWord) => {
  return privateAxios
    .get(`/users/searchKey/${keyWord}`)
    .then((resp) => resp.data);
};

export const searchUserWithEmail = (email) => {
  return privateAxios.get(`/users/email/${email}`).then((resp) => resp.data);
};


export const sendForgetPasswordOtp = (email) =>{
  return publicAxios.post(`/forget/send-otp?email=${email}`).then(resp => resp.data);
}

export const verifyOtpServerSide = (otp) =>{
  return publicAxios.post(`/forget/verify-otp?otp=${otp}`).then(resp => resp.data);
}

export const resetPasswordServerSide = (password) =>{
  return publicAxios.put(`/forget/reset-password?key=${password}` , password).then(resp => resp.data);
}