package com.rust.website.common.config;

import com.rust.website.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static com.rust.website.common.config.JwtAuthenticationFilterApply.jwtAuthenticationFilterApply;
import static com.rust.website.common.config.JwtAuthorizationFilterApply.jwtAuthorizationFilterApply;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig{
    private final CorsConfig corsConfig;

    private final UserRepository userRepository;

    @Bean
    public BCryptPasswordEncoder encoder()
    {
        return new BCryptPasswordEncoder();
    }


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http
                /*.addFilter(corsConfig.corsFilter()) //@CrossOrigin annotation도 가능 근데 이건 인증이 필요한 request 경우 팅김
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) //세션 사용 x
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .authorizeRequests()
                .antMatchers("/user/findId", "/user/findPwd", "/user/exercise", "/user/delete")
                .access("hasRole('USER') or hasRole('MANAGER') or hasRole('ADMIN')")
                .anyRequest().permitAll();*/
                .addFilter(corsConfig.corsFilter())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .csrf().disable()
                .formLogin().disable()
                .httpBasic().disable()
                .apply(jwtAuthenticationFilterApply())
                .and()
                .apply(jwtAuthorizationFilterApply(userRepository))
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .mvcMatchers("/register/**", "/login", "/duplicateId" , "/duplicateEmail", "/authConfirm/**", "/reference/**").permitAll()
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
