package com.rust.website.common.config;

import com.rust.website.common.config.jwt.JwtAuthenticationFilter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

public class JwtAuthenticationFilterApply extends AbstractHttpConfigurer<JwtAuthenticationFilterApply, HttpSecurity> {
    @Override
    public void configure(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
        http.addFilter(new JwtAuthenticationFilter(authenticationManager));
    }
    public static JwtAuthenticationFilterApply jwtAuthenticationFilterApply()
    {
        return new JwtAuthenticationFilterApply();
    }
}
