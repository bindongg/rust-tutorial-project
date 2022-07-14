package com.rust.website.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    public CorsFilter corsFilter(){
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true); //서버가 응답할 때 전송하는 json을 프론트에서 js로 처리할 수 있게
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.addExposedHeader("Authorization"); //cors 정책엔 기본적으로 cache-control, expired 등 몇몇 헤더만 노출 -> 그 외 헤더를 프론트에서 보고 싶으면 넣어줘야 됨
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
