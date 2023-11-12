package com.store.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.store.dto.MailDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.MailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService {

	@Value("${spring.mail.username}")
	private String From;

	@Autowired
	private JavaMailSender javaMailSender;
	

	@Override
	public ApiResponseMessage sendMailFun(MailDto mailData) throws MessagingException {

		// add 2 lines below for html msg
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "utf-8");

//		SimpleMailMessage message = new SimpleMailMessage() ; // this is for simple email without html msg
		message.setFrom(From);
		message.setSubject(mailData.getSubject() + (mailData.getName() == null ? "" :mailData.getName() ));
		String msg ="<h2>" + mailData.getMessage() + "<h2>" ;
		message.setText(msg, true);
		message.setTo(mailData.getEmail());
		message.setCc(From);
		javaMailSender.send(mimeMessage);

		ApiResponseMessage responseMessage = new ApiResponseMessage("Mail Send Successfully", true, HttpStatus.OK);
		return responseMessage;

	}
	
	@Override
	public ApiResponseMessage sendMailFunAfterLogin(MailDto mailData) throws MessagingException {

		// add 2 lines below for html msg
		MimeMessage mimeMessage = javaMailSender.createMimeMessage();
		MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "utf-8");

//		SimpleMailMessage message = new SimpleMailMessage() ; // this is for simple email without html msg
		message.setFrom(From);
		message.setSubject("Welcome to Aapki Dukaan");
		String x = "We are excited to have to here.Thank you for joining."+"<br/>"
				+ "If you feel any doubts , don't hesitate to reach out to us .";
		String name = "Hi " +  mailData.getName();
		String msg = " <div style='max-width:500px; margin:auto;'> " + 
						"<h2>" + name + "</h2>" + 
						"<p>" + x  + "<br/>"+
							"<div style='margin-top:20px; margin-left:8rem;'> " +
								"<a href='http://13.50.228.33:3000/contact' target=''>"+
								"<button>" + "Contact Us!!" + "</button>" + 
								"</a>" +
							"</div>" +								
						"</p>" +
						"<b>" + "Cheers ," + "<br/>" + "Thanks" + "</b>" +
					"</div>";	
				;
		message.setText(msg, true);
		message.setTo(mailData.getEmail());
		message.setCc(From);
		javaMailSender.send(mimeMessage);

		ApiResponseMessage responseMessage = new ApiResponseMessage("Mail Send Successfully", true, HttpStatus.OK);
		return responseMessage;

	}

}
