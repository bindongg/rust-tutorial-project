package com.rust.website.common.config.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rust.website.common.auth.PrincipalDetails;
import com.rust.website.common.cache.RedisService;
import com.rust.website.common.dto.LoginDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { //원래는 spring security 에서 form login으로 id,pwd 전송하면 동작
    private final AuthenticationManager authenticationManager;

    private final RedisService redisService;


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        ObjectMapper om = new ObjectMapper();
        LoginDTO loginDTO = null;
        try
        {
            loginDTO = om.readValue(request.getInputStream(), LoginDTO.class);
        }
        catch (Exception e) {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
        }
        if(loginDTO != null)
        {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                    loginDTO.getUserId(), loginDTO.getUserPassword());

            return authenticationManager.authenticate(usernamePasswordAuthenticationToken);

        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        PrincipalDetails principalDetails = (PrincipalDetails) authResult.getPrincipal();

        String jwtToken = JwtUtil.makeJWT(principalDetails.getUsername(), principalDetails.getRole());
        String refreshToken = JwtUtil.makeRefreshJWT(principalDetails.getUsername(), principalDetails.getRole());

        redisService.setRedisStringValue(principalDetails.getUsername(), JwtProperties.TOKEN_PREFIX+jwtToken);
        redisService.setRedisRefreshObjectValue(JwtProperties.REFRESH_STRING+principalDetails.getUsername(), JwtProperties.TOKEN_PREFIX+jwtToken+JwtProperties.DELIMITER+JwtProperties.TOKEN_PREFIX+refreshToken);

        response.addHeader(JwtProperties.HEADER_STRING, JwtProperties.TOKEN_PREFIX+jwtToken);
        response.addHeader(JwtProperties.HEADER_STRING_REFRESH, JwtProperties.TOKEN_PREFIX+refreshToken);
    }

}
