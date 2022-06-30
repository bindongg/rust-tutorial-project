package com.rust.website.mail.service;

import com.rust.website.user.model.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    public void sendMail(User user)
    {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("rusttutorial@gmail.com");
        message.setTo(user.getEmail());
        message.setSubject("rust tutorial 회원 가입 메일");
        message.setText(
                "<div>" +
                "<p>회원 가입을 위해 아래 링크를 클릭해주세요</p>" +
                "<a href='http://localhost:8080/'></a>" +
                "</div>");
        mailSender.send(message);
    }
}
