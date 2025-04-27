package edu.webdev.catalog.config;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RegistryConfig {

    /**
     * Defines a ConcurrentHashMap bean to be used as the in-memory service registry.
     * The default scope in Spring is singleton, ensuring a single shared instance.
     */
    @Bean
    public Map<String, String> serviceRegistryMap() {
        return new ConcurrentHashMap<>(16, 0.75f);
    }
}