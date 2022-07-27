package com.rust.website.common.config.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import java.util.Date;

public class JwtUtil {
    public static String makeJWT(String userName, String role)
    {
        return JWT.create()
                    .withSubject(userName)
                    .withExpiresAt(new Date(System.currentTimeMillis()+JwtProperties.EXPIRATION_TIME))
                    .withClaim(JwtProperties.CLAIM_NAME, userName)
                    .withClaim(JwtProperties.CLAIM_NAME2, role)
                    .sign(Algorithm.HMAC512(JwtProperties.SECRET));
    }

    public static String getClaim(String token, String claimName)
    {
        return JWT.decode(token.replace(JwtProperties.TOKEN_PREFIX,"")).getClaim(claimName).asString();
    }
}
