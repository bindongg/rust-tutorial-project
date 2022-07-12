package com.rust.website.user.model.entity;

import lombok.Getter;

@Getter
public class MailResendObject {
    String id;
    String authId;
    String password;
    String email;
}
