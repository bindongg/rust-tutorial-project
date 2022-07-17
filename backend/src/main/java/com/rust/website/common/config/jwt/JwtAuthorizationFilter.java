package com.rust.website.common.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.rust.website.common.auth.PrincipalDetails;
import com.rust.website.common.config.CustomAuthenticationEntryPoint;
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

public class JwtAuthorizationFilter extends BasicAuthenticationFilter { //권한

    private final UserRepository userRepository;


    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository) {
        super(authenticationManager);
        this.userRepository = userRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        if(header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX))
        {
            chain.doFilter(request,response);
            return;
        }

        String token = request.getHeader(JwtProperties.HEADER_STRING).replace(JwtProperties.TOKEN_PREFIX, "");
        try{
            String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token)
                    .getClaim(JwtProperties.CLAIM_NAME).asString();
            if (username != null) {
                Optional<User> optUser = userRepository.findByIdAndAuthState(username, UserAuthState.ACTIVE);
                if(optUser.isPresent()) {
                    PrincipalDetails principalDetails = new PrincipalDetails(optUser.get());
                    Authentication authentication = new UsernamePasswordAuthenticationToken(principalDetails,
                            null,
                            principalDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);

                    response.setHeader(JwtProperties.HEADER_STRING, JwtUtil.makeJWT(principalDetails.getUsername())); //토큰 갱신 및 로그아웃 위해 redis 필요?
                }
                else
                {
                    throw new IllegalArgumentException();
                }
            }
        }
        catch (TokenExpiredException | JWTDecodeException | IllegalArgumentException | AuthenticationException e)
        {
            response.setStatus(HttpStatus.BAD_REQUEST.value());
            return;
        }

        chain.doFilter(request, response);
    }
}
