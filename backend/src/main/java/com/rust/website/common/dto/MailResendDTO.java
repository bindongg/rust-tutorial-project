package com.rust.website.common.dto;

import lombok.Getter;

@Getter
public class MailResendDTO {
    String id;
    String authId;
    String password;
    String email;
}
