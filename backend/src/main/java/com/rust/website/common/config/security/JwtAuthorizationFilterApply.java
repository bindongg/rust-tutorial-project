package com.rust.website.common.config.security;

import com.rust.website.common.cache.RedisService;
import com.rust.website.common.config.jwt.JwtAuthorizationFilter;
import com.rust.website.user.repository.UserRepository;
import org.springframework.boot.autoconfigure.cache.CacheProperties;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

public class JwtAuthorizationFilterApply extends AbstractHttpConfigurer<JwtAuthorizationFilterApply, HttpSecurity> {

    private final UserRepository userRepository;

    private final RedisService redisService;


    public JwtAuthorizationFilterApply(UserRepository userRepository, RedisService redisService)
    {

        this.userRepository = userRepository;
        this.redisService = redisService;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        try{
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http.addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository, redisService));
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public static JwtAuthorizationFilterApply jwtAuthorizationFilterApply(UserRepository userRepository, RedisService redisService)
    {
        return new JwtAuthorizationFilterApply(userRepository, redisService);
    }
}
