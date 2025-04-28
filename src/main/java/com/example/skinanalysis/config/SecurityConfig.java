package com.example.skinanalysis.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.header.writers.ContentSecurityPolicyHeaderWriter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers(headers -> headers
                        .contentSecurityPolicy(csp -> csp
                                .policyDirectives("default-src 'self'; " +
                                        "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.gstatic.com https://*.firebaseio.com https://apis.google.com; " +
                                        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; " +
                                        "font-src 'self' https://fonts.gstatic.com; " +
                                        "img-src 'self' data: https:; " +
                                        "connect-src 'self' https://*.firebase.com https://*.firebaseio.com https://identitytoolkit.googleapis.com; " +
                                        "frame-src 'self' https://*.firebaseapp.com;")
                        )
                )
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/**").permitAll()
                )
                .csrf(csrf -> csrf.disable());  // Only for development, configure properly for production

        return http.build();
    }
}