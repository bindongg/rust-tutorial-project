package com.rust.website.common.config.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.rust.website.common.cache.RedisService;
import com.rust.website.common.config.jwt.JwtProperties;
import com.rust.website.common.config.jwt.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.LogoutHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CustomLogoutHandler implements LogoutHandler {

    private final RedisService redisService;

    public CustomLogoutHandler(RedisService redisService)
    {
        this.redisService = redisService;
    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        try{
            String token = request.getHeader("authorization");
            String username = JwtUtil.getClaim(token,JwtProperties.CLAIM_NAME);
            /*String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token.replace(JwtProperties.TOKEN_PREFIX, ""))
                    .getClaim(JwtProperties.CLAIM_NAME).asString();*/
            redisService.delRedisStringValue(username);
            redisService.delRedisStringValue(JwtProperties.REFRESH_STRING+username);
            SecurityContextHolder.clearContext();
        }
        catch (Exception e)
        {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
        }
    }
}
