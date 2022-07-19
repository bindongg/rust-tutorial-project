package com.rust.website.common.config.security;

import com.rust.website.common.cache.RedisService;
import com.rust.website.common.config.jwt.JwtAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

public class JwtAuthenticationFilterApply extends AbstractHttpConfigurer<JwtAuthenticationFilterApply, HttpSecurity> {

    private final RedisService redisService;

    public JwtAuthenticationFilterApply(RedisService redisService)
    {
        this.redisService = redisService;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http.addFilter(new JwtAuthenticationFilter(authenticationManager, redisService));
    }
    public static JwtAuthenticationFilterApply jwtAuthenticationFilterApply(RedisService redisService)
    {
        return new JwtAuthenticationFilterApply(redisService);
    }
}
