package com.store.service;

import com.store.dto.MailDto;
import com.store.responsemsg.ApiResponseMessage;

import jakarta.mail.MessagingException;

public interface MailService {
	public ApiResponseMessage sendMailFun(MailDto mailData) throws MessagingException;

	public ApiResponseMessage sendMailFunAfterLogin(MailDto mailData) throws MessagingException;
}
