package com.rust.website.mail.service;

import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.entity.UserAuth;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final JavaMailSender mailSender;

    @Async
    public void sendAuthMail(String userEmail, UserAuth userAuth)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rusttutorial@gmail.com");
        message.setTo(userEmail);
        message.setSubject("rust tutorial 회원 가입 메일");
        message.setText(
                "회원 가입을 위해 아래 링크를 클릭해주세요\n" +
                "http://localhost:8080/authConfirm/" + userAuth.getId());
        mailSender.send(message);
    }
}
