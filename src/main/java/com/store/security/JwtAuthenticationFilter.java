package com.store.security;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.store.service.impl.CustomUserDetailsService;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final Logger log = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

	@Autowired
	private JwtHelper jwtHelper;

	@Autowired
	private CustomUserDetailsService customUserDetailsService;

	// it intercept the request
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		// Fetch the header from Authorization
		String requestHeader = request.getHeader("Authorization");
		log.info("Header is {}", requestHeader);

		String username = null;
		String token = null;

		if (requestHeader != null && requestHeader.startsWith("Bearer")) {
			// now we can go forward;
			token = requestHeader.substring(7);

			try {

				username = this.jwtHelper.getUsernameFromToken(token);

			} catch (IllegalArgumentException e) {
				log.info("IllegalArgument !!");
				e.printStackTrace();
			} catch (ExpiredJwtException e) {
				log.info("ExpiredJwt Token!!");
				e.printStackTrace();
			} catch (MalformedJwtException e) {
				log.info("Changes occured in token!!");
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else {
			log.info("Invalid Header Value !!..");
		}

		// SecurityContextHolder.getContext().getAuthentication() == null --> this means
		// no one login till now ..
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			// means till here everything is fine here

			UserDetails userDetails = this.customUserDetailsService.loadUserByUsername(username);

			// now validate the token with this userDetails

			Boolean ok = this.jwtHelper.validateToken(token, userDetails);

			if (ok == true) {
				// then we can set the validation | authentication
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);

				log.info("Validation ok !!");
			} else {
				log.info("Validation failed !!");
			}

		}
		
		filterChain.doFilter(request, response);

	}

}
