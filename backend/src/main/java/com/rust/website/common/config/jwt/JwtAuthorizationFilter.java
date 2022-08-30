package com.rust.website.common.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.security.core.parameters.P;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.Principal;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.Map;
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

            if(username == null)
            {
                throw new IllegalArgumentException();
            }
            else
            {
                Optional<User> optUser = userRepository.findByIdAndAuthState(username, UserAuthState.ACTIVE);
                if(optUser.isEmpty())
                {
                    throw new IllegalArgumentException();
                }
                else
                {
                    if(redisService.getRedisStringValue(username) == null)
                    {
                        System.out.println("null jwt");
                        String tokenString = redisService.getRedisStringValue(JwtProperties.REFRESH_STRING+username);

                        if(tokenString == null)
                        {
                            throw new IllegalArgumentException();
                        }
                        else
                        {
                            String[] arr = tokenString.split(JwtProperties.DELIMITER);
                            String jwtToken = arr[0];
                            String refreshToken = arr[1];

                            if(!token.equals(jwtToken))
                            {
                                throw new IllegalArgumentException();
                            }
                            else
                            {
                                if(!JwtUtil.getClaim(refreshToken,JwtProperties.CLAIM_NAME).equals(username))
                                {
                                    throw new IllegalArgumentException();
                                }
                                else
                                {
                                    PrincipalDetails principalDetails = new PrincipalDetails(optUser.get());

                                    String newAccessToken = JwtUtil.makeJWT(principalDetails.getUsername(),principalDetails.getRole());

                                    response.setHeader(JwtProperties.HEADER_STRING,JwtProperties.TOKEN_PREFIX+newAccessToken);

                                    redisService.setRedisStringValue(principalDetails.getUsername(),JwtProperties.TOKEN_PREFIX+newAccessToken);

                                    redisService.setRedisRefreshObjectValue(JwtProperties.REFRESH_STRING+username,JwtProperties.TOKEN_PREFIX+newAccessToken+JwtProperties.DELIMITER+JwtProperties.TOKEN_PREFIX+refreshToken);

                                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,
                                            null,
                                            principalDetails.getAuthorities());
                                    SecurityContextHolder.getContext().setAuthentication(authentication);
                                    chain.doFilter(request,response);
                                }
                            }
                        }
                    }
                    else
                    {
                        if(!token.equals(redisService.getRedisStringValue(username)))
                        {
                            throw new IllegalArgumentException();
                        }
                        else
                        {
                            PrincipalDetails principalDetails = new PrincipalDetails(optUser.get());
                            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,
                                    null,
                                    principalDetails.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            chain.doFilter(request,response);
                        }
                    }
                }
            }
        }
        catch (TokenExpiredException e)
        {
            System.out.println("exp");
            String username = JwtUtil.getClaim(token,JwtProperties.CLAIM_NAME);

            String tokenString = redisService.getRedisStringValue(JwtProperties.REFRESH_STRING+username);

            if(tokenString == null)
            {
                System.out.println(1);
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }
            else
            {
                String[] arr = tokenString.split(JwtProperties.DELIMITER);
                String jwtToken = arr[0];
                String refreshToken = arr[1];

                if(!jwtToken.equals(token))
                {
                    System.out.println(2); //front의 token도 재발급에 따라 업데이트 해줘야됨
                    System.out.println(jwtToken);
                    System.out.println(token);
                    response.setStatus(HttpStatus.UNAUTHORIZED.value());
                    return;
                }
                else
                {
                    if(!JwtUtil.getClaim(refreshToken,JwtProperties.CLAIM_NAME).equals(username))
                    {
                        System.out.println(3);
                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                        return;
                    }
                    else
                    {
                        Optional<User> optUser = userRepository.findByIdAndAuthState(username,UserAuthState.ACTIVE);
                        if(optUser.isEmpty())
                        {
                            System.out.println(4);
                            response.setStatus(HttpStatus.UNAUTHORIZED.value());
                            return;
                        }
                        else
                        {
                            PrincipalDetails principalDetails = new PrincipalDetails(optUser.get());

                            String newAccessToken = JwtUtil.makeJWT(principalDetails.getUsername(),principalDetails.getRole());

                            response.setHeader(JwtProperties.HEADER_STRING,JwtProperties.TOKEN_PREFIX+newAccessToken);

                            redisService.setRedisStringValue(username,JwtProperties.TOKEN_PREFIX+newAccessToken);
                            redisService.setRedisRefreshObjectValue(JwtProperties.REFRESH_STRING+username,JwtProperties.TOKEN_PREFIX+newAccessToken+JwtProperties.DELIMITER+JwtProperties.TOKEN_PREFIX+refreshToken);

                            Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,
                                    null,
                                    principalDetails.getAuthorities());
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                            System.out.println("done");
                            chain.doFilter(request,response);
                            return;
                        }
                    }
                }
            }
        }
        catch(IllegalArgumentException e)
        {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }
        catch (SignatureVerificationException | JWTDecodeException | AuthenticationException e)
        {
            String username = JwtUtil.getClaim(token,JwtProperties.CLAIM_NAME);
            redisService.delRedisStringValue(username);
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            return;
        }
    }
}
