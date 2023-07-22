package com.store.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
		info = @Info(
					contact = @Contact (
							name = "Saurabh Maurya" ,
							email = "saurabhyash1707@gmail.com"
							),
					description = "All Api is for Electronic Store",
					title = "ELectronic Store",
					version = "1.0",
					termsOfService = "This Project is for Learning purpose only"
					
				),
		servers = {
				@Server(
						description = "Local",
						url = "http://localhost:2023"
					),
				@Server(
					description = "DEV",
					url = "http://localhost:2024"
				)
		}
		
)

@SecurityScheme(
		name = "bearerAuth",
		description = "JWT auth description",
		scheme = "Bearer",
		type = SecuritySchemeType.HTTP ,
		bearerFormat = "JWT" ,
		in = SecuritySchemeIn.HEADER
)

public class SwaggerConfig {
	
	
}
