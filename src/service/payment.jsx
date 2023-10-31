import { privateAxios } from "./axios.service"

export const startPayement = (details) =>{
    return privateAxios.post(`/payment/start` , details).then(resp => resp.data); 
}


