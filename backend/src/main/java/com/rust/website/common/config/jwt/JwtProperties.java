package com.rust.website.common.config.jwt;

public interface JwtProperties {
    String SECRET = "rusttutorial"; // 우리 서버만 알고 있는 비밀값
    int EXPIRATION_TIME = 1800000; // 30분, ms
    String TOKEN_PREFIX = "Bearer ";
    String HEADER_STRING = "authorization";
    String CLAIM_NAME = "username";
}
