package com.ssdk.libraryPro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@SpringBootApplication
public class AppLibraryPro {

	public static void main(String[] args) {
		SpringApplication.run(AppLibraryPro.class, args);
	}

	@Component
	public static class PortLogger {
		private final Environment env;

		public PortLogger(Environment env) {
			this.env = env;
		}

		@EventListener
		public void onWebServerReady(WebServerInitializedEvent event) {
			String configured = env.getProperty("server.port", "8080");
			int actualPort = event.getWebServer().getPort();
			System.out.println("[AppLibraryPro] Puerto configurado en application.properties: " + configured + " - Puerto en uso: " + actualPort);
		}
	}

}