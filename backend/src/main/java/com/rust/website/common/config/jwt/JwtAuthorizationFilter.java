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

public class JwtAuthorizationFilter extends BasicAuthenticationFilter { //권한

    private final UserRepository userRepository;

    private final RedisService redisService;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager, UserRepository userRepository, RedisService redisService) {
        super(authenticationManager);
        this.userRepository = userRepository;
        this.redisService = redisService;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String header = request.getHeader(JwtProperties.HEADER_STRING);
        if(header == null || !header.startsWith(JwtProperties.TOKEN_PREFIX))
        {
            chain.doFilter(request,response);
            return;
        }

        String token = request.getHeader(JwtProperties.HEADER_STRING);
        try{
            String username = JWT.require(Algorithm.HMAC512(JwtProperties.SECRET)).build().verify(token.replace(JwtProperties.TOKEN_PREFIX, ""))
                    .getClaim(JwtProperties.CLAIM_NAME).asString();

            if(!token.equals(redisService.getRedisStringValue(username))) //받은 토큰과 redis에 저장된 토큰 비교
            {
                throw new Exception();
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

                    response.setHeader(JwtProperties.HEADER_STRING, JwtUtil.makeJWT(principalDetails.getUsername())); //토큰이 유효한 상태로 요청 시 토큰 유효시간을 위해 새 토큰 발행?
                }
                else
                {
                    throw new IllegalArgumentException();
                }
            }
        }
        catch (TokenExpiredException | JWTDecodeException | IllegalArgumentException | AuthenticationException e)
        {
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); //401, 그냥 로그아웃 처리 -> 프론트에서 다시 로그아웃 api로 요청하는 방식으로?
            return;
        }
        catch (Exception e)
        {
            response.setStatus(HttpStatus.UNAUTHORIZED.value()); //마찬가지
            return;
        }

        chain.doFilter(request, response);
    }
}
