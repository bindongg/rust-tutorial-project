package com.rust.website.common.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterDTO {
    String userId;
    String userPassword;
    String userEmail;
}
