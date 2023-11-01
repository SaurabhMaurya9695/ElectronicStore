package com.store.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.store.responsemsg.PaymentResponse;
import com.store.service.OrderService;
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
	private OrderService orderService;
	
	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/start")
	public ResponseEntity<PaymentResponse> startPayment(@RequestBody Map<String, Object> data)
			throws RazorpayException {
		System.out.println(data);
		int amount = (int) data.get("amount");
		String orderId = data.get("orderId").toString();
		String userId = data.get("userId").toString();
		
		System.out.println(amount);
		System.out.println(orderId);
		System.out.println(userId);

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
		orderRequest.put("reminder_enable" , true);
		orderRequest.put("description" , "To Complete the Order Pay here !!");
		
		// creating Use
		JSONObject customer = new JSONObject();
		customer.put("name", user.getName());
		customer.put("email", user.getEmail());
		customer.put("userId", user.getUserId());
		// we want to notify our user when we are doing payment
		JSONObject notify = new JSONObject();
		notify.put("sms", true);
		notify.put("email", true);
		
		JSONObject notes = new JSONObject();
		notes.put("policy_name","AapkiDukkan");

		orderRequest.put("customer", customer);
		orderRequest.put("notify", notify);
		orderRequest.put("callback_url", "http://localhost:3000/users/payment-success/" + orderId);
		orderRequest.put("callback_method", "get");

		PaymentLink link = client.paymentLink.create(orderRequest);

		System.out.println(link);
		String paymentLinkId = link.get("id");
		String paymentLinkUrl = link.get("short_url");

		PaymentResponse response = new PaymentResponse();
		response.setPayment_id(paymentLinkId);
		response.setPayment_url(paymentLinkUrl);

		Order order = orderRepository.findById(orderId).get();
		System.out.println("order is");
		System.out.println(order);
		// creating order now
//        Order createdOrder = client.orders.create(orderRequest) ;
//        System.out.println(createdOrder);

		// till now Order Created Successfully
		// if you want to save this information to db then you can

		return new ResponseEntity<PaymentResponse>(response, HttpStatus.CREATED);
	}

	@GetMapping("/updateOrderAfterPayment")
	public ApiResponseMessage updatePayment(@RequestParam("payment_id") String payment_Id , @RequestParam("orderId") String orderId) throws RazorpayException{
		
		Order order = null;
		try {
			order = orderRepository.findById(orderId).get();
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.out.println("order is");
		System.out.println(order.getOrderId());
		System.out.println("till here " + order);
		
		RazorpayClient razorpay = new RazorpayClient(RZP_KEY_ID, RZP_KEY_SECRET);
		
		Payment payment = razorpay.payments.fetch(payment_Id);
		if(payment.get("Status").equals("captured")) {
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
	
}
