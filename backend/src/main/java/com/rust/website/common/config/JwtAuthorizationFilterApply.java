package com.rust.website.common.config;

import com.rust.website.common.config.jwt.JwtAuthorizationFilter;
import com.rust.website.user.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;

public class JwtAuthorizationFilterApply extends AbstractHttpConfigurer<JwtAuthorizationFilterApply, HttpSecurity> {

    private final UserRepository userRepository;

    public JwtAuthorizationFilterApply(UserRepository userRepository)
    {
        this.userRepository = userRepository;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        try{
            AuthenticationManager authenticationManager = http.getSharedObject(AuthenticationManager.class);
            http.addFilter(new JwtAuthorizationFilter(authenticationManager, userRepository));
        }
        catch (Exception e)
        {
            e.printStackTrace();
        }
    }

    public static JwtAuthorizationFilterApply jwtAuthorizationFilterApply(UserRepository userRepository)
    {
        return new JwtAuthorizationFilterApply(userRepository);
    }
}
