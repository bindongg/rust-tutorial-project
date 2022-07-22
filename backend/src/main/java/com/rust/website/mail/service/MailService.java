package com.rust.website.mail.service;

import com.rust.website.common.CommonProperties;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    //@Async
    public void sendAuthMail(String userEmail, String authId) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(CommonProperties.EMAIL);
        message.setTo(userEmail);
        message.setSubject("rust tutorial 회원 가입 메일");
        message.setText(
                "회원 가입을 위해 아래 링크를 클릭해주세요\n" +
                        "http://localhost:8080/authConfirm/" + authId);
        mailSender.send(message);
    }

    public void sendPasswordMail(String userEmail, String password)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(CommonProperties.EMAIL);
        message.setTo(userEmail);
        message.setSubject("rust tutorial 임시 비밀번호");
        message.setText(
            "임시 비밀번호는 " + password + "입니다. 반드시 로그인 후 비밀번호를 변경해주세요"
        );
        mailSender.send(message);
    }
}
