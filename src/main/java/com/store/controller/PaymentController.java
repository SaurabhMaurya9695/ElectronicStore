package com.store.controller;

import java.util.Map;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.apache.commons.codec.binary.Hex;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;
import com.store.dto.UserDto;
import com.store.entities.Order;
import com.store.repository.OrderRepository;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.UserService;

@RestController
@RequestMapping("/payment")
@CrossOrigin
public class PaymentController {

	@Value("${rzp_key_id}")
	private String RZP_KEY_ID;

	@Value("${rzp_key_secret}")
	private String RZP_KEY_SECRET;

	@Value("${rzp_currency}")
	private String RZP_CURRENCY;

	@Autowired
	private UserService userService;

	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/start")
	public String startPayment(@RequestBody Map<String, Object> data) throws RazorpayException {
		System.out.println(data);
		int amount = (int) data.get("amount");
		String orderId = data.get("orderId").toString();
		String userId = data.get("userId").toString();
		this.sendNotifications(amount , userId , orderId);
		// fetch user now
		UserDto user = userService.getUserById(userId);

		RazorpayClient client = null;
		try {
			client = new RazorpayClient(RZP_KEY_ID, RZP_KEY_SECRET);
		} catch (RazorpayException e) {
			e.printStackTrace();
		}

		// everything done in paisa
		// creating OrderRequest
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100); // amount in the smallest currency unit
		orderRequest.put("currency", RZP_CURRENCY);
		orderRequest.put("receipt", user.getUserId());

		
		com.razorpay.Order createdOrder = client.orders.create(orderRequest);
		createdOrder.get("id");
		System.out.println(createdOrder);
		return createdOrder.toString();
	}

	public static String encode(String key, String data) throws Exception {
		Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
		SecretKeySpec secret_key = new SecretKeySpec(key.getBytes("UTF-8"), "HmacSHA256");
		sha256_HMAC.init(secret_key);

		return Hex.encodeHexString(sha256_HMAC.doFinal(data.getBytes("UTF-8")));
	}

	@GetMapping("/updateOrderAfterPayment")
	public ApiResponseMessage updatePayment(@RequestParam("payment_id") String payment_Id,
			@RequestParam("orderId") String orderId, @RequestParam("RZP_ORDER_ID") String RZP_ORDER_ID,
			@RequestParam("signature") String signature 
			) throws Exception {

		Order order = null;
		try {
			order = orderRepository.findById(orderId).get();
		} catch (Exception e) {
			e.printStackTrace();
		}
		String generated_signature = encode(RZP_KEY_SECRET, RZP_ORDER_ID + "|" + payment_Id);
		JSONObject options = new JSONObject();
		options.put("razorpay_order_id", RZP_ORDER_ID);
		options.put("razorpay_payment_id", payment_Id);
		options.put("razorpay_signature", signature);

		boolean status = Utils.verifyPaymentSignature(options, RZP_KEY_SECRET);
		
		if (status) {
			order.setOrderStatus("DISPATCHED");
			order.setPayementStatus("PAID");
			this.orderRepository.save(order);
		}

		ApiResponseMessage message = new ApiResponseMessage();
		message.setCode(HttpStatus.ACCEPTED);
		message.setMessage("Payment Accepted SuccessFully");
		message.setSuccess(true);
		return message;
	}
	
	public void sendNotifications (int amount , String userId , String orderID) throws RazorpayException {
		RazorpayClient razorpay = new RazorpayClient(RZP_KEY_ID, RZP_KEY_SECRET);
		JSONObject paymentLinkRequest = new JSONObject();
		paymentLinkRequest.put("amount",amount * 100);
		paymentLinkRequest.put("currency","INR");
		paymentLinkRequest.put("description" , "To Complete the Order Pay here !! if this link is not working from mail then pay from website."
				+ "and in UPI section use success@razorpay to make the transaction successfull");
//		paymentLinkRequest.put("upi_link",true);
		
		UserDto user = userService.getUserById(userId);

		JSONObject customer = new JSONObject();
		customer.put("name", user.getName());
		customer.put("email", user.getEmail());
		customer.put("userId", user.getUserId());
		paymentLinkRequest.put("customer",customer);
		
		JSONObject notify = new JSONObject();
		notify.put("sms",true);
		notify.put("email",true);
		paymentLinkRequest.put("notify",notify);
		paymentLinkRequest.put("reminder_enable",true);
		
		JSONObject notes = new JSONObject();
		notes.put("policy_name","Aapki Dukaan");
		paymentLinkRequest.put("notes",notes);
		paymentLinkRequest.put("callback_url","http://localhost:3000/users/payment-success/" +orderID );
		paymentLinkRequest.put("callback_method","get");
		              
		PaymentLink payment = razorpay.paymentLink.create(paymentLinkRequest);
		System.out.println("send notification");
		System.out.println(payment);
		return ;
	}

}
