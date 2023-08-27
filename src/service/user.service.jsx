import { publicAxios } from "./axios.service"

export const registerUser =(userData)=>{
    return publicAxios.post(`/users/` , userData)
    .then((response)=> response.data)
}


// export const  async registerUser = (userData)=>{
//     // return await publicAxios.post(`/users/` , userData);
//     let p = await publicAxios.post(`/users/` , userData) ; 

// }




