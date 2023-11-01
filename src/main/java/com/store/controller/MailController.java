package com.store.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.store.dto.MailDto;
import com.store.responsemsg.ApiResponseMessage;
import com.store.service.MailService;

import jakarta.mail.MessagingException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/mail")
public class MailController {

	@Autowired
	private MailService mailService;

	@PostMapping("/sendMail")
	public ApiResponseMessage sendMail(@Valid @RequestBody MailDto data) throws MessagingException {
		ApiResponseMessage resp = mailService.sendMailFun(data);
		return resp;
	}
}
