package com.rust.website.common.config.security;

import com.rust.website.common.cache.RedisService;
import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandler;

import static com.rust.website.common.config.security.JwtAuthenticationFilterApply.jwtAuthenticationFilterApply;
import static com.rust.website.common.config.security.JwtAuthorizationFilterApply.jwtAuthorizationFilterApply;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
    private final CorsConfig corsConfig;

    private final UserRepository userRepository;

    private final RedisService redisService;

    //private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;

    private final AccessDeniedHandler CustomAccessDeniedHandler;

    @Bean
    public BCryptPasswordEncoder encoder()
    {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                .addFilter(corsConfig.corsFilter())

                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()

                .csrf().disable()

                .formLogin().disable()

                .httpBasic().disable()

                .apply(jwtAuthenticationFilterApply(redisService))

                .and()

                .apply(jwtAuthorizationFilterApply(userRepository,redisService))

                .and()

                .logout()
                .logoutUrl("/logout")
                .addLogoutHandler(new CustomLogoutHandler(redisService))
                .logoutSuccessHandler(new CustomLogoutSuccessHandler())
                .and()

                .exceptionHandling()
                //.authenticationEntryPoint(customAuthenticationEntryPoint)
                .accessDeniedHandler(CustomAccessDeniedHandler)
                .and()

                .authorizeHttpRequests(authorize -> authorize
                        .mvcMatchers("/register/**", "/login", "/logout", "/duplicateId" , "/duplicateEmail",
                                "/authConfirm/**", "/reference/**", "/id", "/password","/question/**","/test/**").permitAll()
                        .mvcMatchers("/admin/**").hasRole("ADMIN")
                        .mvcMatchers("/manager/**").hasAnyRole("ADMIN", "MANAGER")
                        .mvcMatchers("/user/**").hasAnyRole("ADMIN", "MANAGER", "USER")
                        .mvcMatchers("/exercise/**").hasAnyRole("ADMIN", "MANAGER", "USER")
                        .mvcMatchers("/tutorial/**").hasAnyRole("ADMIN", "MANAGER", "USER")
                        .anyRequest().denyAll()
                );




        return http.build();
    }
}
