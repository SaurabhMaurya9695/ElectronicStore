import { privateAxios, publicAxios } from "./axios.service";

export const startPayement = (details) => {
  return privateAxios.post(`/payment/start`, details).then((resp) => resp.data);
};

export const successfulPayment = (RZP_PAYMENT_ID, RZP_SIGNATURE_ID ,RZP_ORDER_ID ,User_ORDERID ) => {
  return privateAxios
    .get(
      `/payment/updateOrderAfterPayment?payment_id=${RZP_PAYMENT_ID}&orderId=${User_ORDERID}&signature=${RZP_SIGNATURE_ID}&RZP_ORDER_ID=${RZP_ORDER_ID}`
    )
    .then((resp) => resp.data);
};


export const provideFeedback = (data)=>{
  console.log(data);
  return publicAxios.post(`/mail/sendMail` , data).then(resp => resp.data);
}