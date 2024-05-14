//package com.example.project.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.http.SessionCreationPolicy;
//import org.springframework.security.web.SecurityFilterChain;
//
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//	@Bean
//	public SecurityFilterChain securityConfiguration(HttpSecurity http) throws Exception {
//		
//		http.cors(cors->cors.disable())
//        .csrf(csrf -> csrf.disable()).authorizeHttpRequests(authorize -> authorize.anyRequest().permitAll())
//        .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.ALWAYS));
//		return http.build();
//
//
//
//
//		
//
//	}
//}
