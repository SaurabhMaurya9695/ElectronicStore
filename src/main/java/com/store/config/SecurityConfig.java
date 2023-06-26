package com.store.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.store.service.impl.CustomUserDetailsService;

// here we can create all security related beans .. after creating beans .. we can Autowired anywhere in project 
//configuration class is handling for beans only
@Configuration
public class SecurityConfig {

	/*
	 * @Bean public UserDetailsService userDetailsService() {
	 * 
	 * 
	 * //this user is coming from security which helps us to create user UserDetails
	 * normalUser = User.builder() .username("Yashu") // .password("Yashu") ->
	 * without password Encoder .password(passwordEncoder().encode("Yashu"))
	 * .roles("NORMAL") .build();
	 * 
	 * UserDetails adminUser = User.builder() .username("Saurabh") //
	 * .password("1234") .password(passwordEncoder().encode("1234")) .roles("ADMIN")
	 * .build();
	 * 
	 * // InMemoryUserDetailsManager - is a implementation class of
	 * UserDetailsService return new InMemoryUserDetailsManager(normalUser ,
	 * adminUser);
	 * 
	 * }
	 * 
	 * 
	 * @Bean public PasswordEncoder passwordEncoder() { return new
	 * BCryptPasswordEncoder(); }
	 */

//--------------------------------------------------------------------------------------------------------------------------------------------

	// we have to use UserDetails and UserDetails Interfaces ;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// this is responsible for authentication the user
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
		return daoAuthenticationProvider;
	}

	// create a bean which is responsible for filterChainMathods (FormBaseLogin)
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		
		/*  demo Code for Understanding
 		    http
			.authorizeRequests()
			.anyRequest()
			.authenticated()
			.and()
			.formLogin()
			.loginPage("login.page")
			.loginProcessingUrl("/dashboard")
			.and()
			.logout()
			.logoutUrl("/logout");
		
		return http.build();
		*/
		
		http
			.csrf()
			.disable()
			.cors()
			.disable()
			.authorizeRequests()
			.anyRequest()
			.authenticated()
			.and()
			.httpBasic();
		
		return http.build();
		
	}

}
