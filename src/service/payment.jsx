import { privateAxios, publicAxios } from "./axios.service";

export const startPayement = (details) => {
  return privateAxios.post(`/payment/start`, details).then((resp) => resp.data);
};

export const successfulPayment = (payment_id, orderId) => {
  return privateAxios
    .get(
      `/payment/updateOrderAfterPayment?payment_id=${payment_id}&orderId=${orderId}`
    )
    .then((resp) => resp.data);
};


export const provideFeedback = (data)=>{
  console.log(data);
  return publicAxios.post(`/mail/sendMail` , data).then(resp => resp.data);
}