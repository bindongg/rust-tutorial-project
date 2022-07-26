package com.rust.website.common.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.rust.website.common.auth.PrincipalDetails;
import com.rust.website.common.cache.RedisService;
import com.rust.website.user.model.entity.User;
import com.rust.website.user.model.myEnum.UserAuthState;
import com.rust.website.user.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;

    private final RedisService redisService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, RedisService redisService) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.redisService = redisService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = request.getHeader(JwtProperties.HEADER_STRING);
        if(token == null || !token.startsWith(JwtProperties.TOKEN_PREFIX))
        {
            chain.doFilter(request,response);
            return;
        }

        try{
            String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token.replace(JwtProperties.TOKEN_PREFIX, ""))
                    .getClaim(JwtProperties.CLAIM_NAME).asString();

            if(!token.equals(redisService.getRedisStringValue(username)))
            {
                throw new IllegalArgumentException();
            }

            if (username != null) {
                Optional<User> optUser = userRepository.findByIdAndAuthState(username, UserAuthState.ACTIVE);
                if(optUser.isPresent())
                {
                    PrincipalDetails principalDetails = new PrincipalDetails(optUser.get());
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,
                            null,
                            principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    //response.setHeader(JwtProperties.HEADER_STRING, JwtUtil.makeJWT(principalDetails.getUsername()));
                }
                else
                {
                    throw new IllegalArgumentException();
                }
            }
        }
        catch (TokenExpiredException | JWTDecodeException | IllegalArgumentException | AuthenticationException e)
        {
            String username = JWT.decode(token.replace(JwtProperties.TOKEN_PREFIX,"")).getClaim(JwtProperties.CLAIM_NAME).asString();
            redisService.delRedisStringValue(username);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }

        chain.doFilter(request, response);
    }
}
