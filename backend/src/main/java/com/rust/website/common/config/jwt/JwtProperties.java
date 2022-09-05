package com.rust.website.common.config.jwt;

public interface JwtProperties {
    String SECRET = "rusttutorial"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME_ACCESS = 1800000; // 30분, ms
    int EXPIRATION_TIME_REFRESH = 86400000;
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "authorization";
    String HEADER_STRING_REFRESH = "refresh";
    String REFRESH_STRING = "Refresh_";
    String CLAIM_NAME = "username";
    String CLAIM_NAME2 = "role";
    String DELIMITER = " , ";
}
