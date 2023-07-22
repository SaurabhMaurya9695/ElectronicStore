package com.store.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import com.store.security.JwtAuthenticationEntryPoint;
import com.store.security.JwtAuthenticationFilter;
import com.store.service.impl.CustomUserDetailsService;

// here we can create all security related beans .. after creating beans .. we can Autowired anywhere in project 
//configuration class is handling for beans only
@Configuration
@EnableMethodSecurity(prePostEnabled = true)

// this upper annotation means you can use the method level security.. you can secure any method by using annotation
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
	
	@Autowired
	private JwtAuthenticationFilter authenticationFilter ;
	
	@Autowired
	private JwtAuthenticationEntryPoint authenticationEntryPoint ;
	
	

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	// this is responsible for authentication the user
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
		daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());
		daoAuthenticationProvider.setUserDetailsService(customUserDetailsService);
		return daoAuthenticationProvider;
	}

	
//	private final String[] PUBLIC_URLS = {
//		"/v2/api-docs",
//	    "/swagger-resources",
//	    "/swagger-resources/**",
//	    "/configuration/ui",
//	    "/configuration/security",
//	    "/swagger-ui.html",
//	    "/webjars/**",
//	    "/v3/api-docs/**",
//	    "/swagger-ui/**",
//	};
	
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
		
		/*   this is the basic configuration without JWT.
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
		*/
		
		// here we make login api public to user..order important
		
		http
			.csrf()
			.disable()
			.cors()
			.and()
			.authorizeHttpRequests()
			.requestMatchers(
					"/v2/api-docs",
				    "/swagger-resources",
				    "/swagger-resources/**",
				    "/configuration/ui",
				    "/configuration/security",
				    "/swagger-ui.html",
				    "/webjars/**",
				    "/v3/api-docs/**",
				    "/swagger-ui/**",
				    "/api/v1/auth/**",
				    "/test"
				)
			.permitAll()
			.requestMatchers("/auth/login")
			.permitAll()
			.requestMatchers("/auth/google")
			.permitAll()
			.requestMatchers(HttpMethod.POST , "/users/")
			.permitAll()
			.requestMatchers(HttpMethod.DELETE , "/users/**")
			.hasRole("ADMIN")
			.anyRequest()
			.authenticated()
			.and()
			.exceptionHandling()
			.authenticationEntryPoint(authenticationEntryPoint)
			.and()
			.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
		
	}
	

	
}
