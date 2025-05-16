package edu.webdev.catalog.controllers;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.webdev.catalog.infrastructure.security.SecurityService;
import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.Password;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;

// Import Lombok's RequiredArgsConstructor (for constructor injection)
import lombok.RequiredArgsConstructor;


/**
 * Controller for handling user authentication and registration.
 * The SecurityService is injected by Spring using Lombok.
 * Accepts JSON request bodies as Map.
 * Does NOT perform explicit input validation within the controller.
 * Uses UserProfile.builder() for creating UserProfile instances.
 * ALL exception handling (including authentication and data processing errors)
 *

@RestController
@RequiredArgsConstructor // Lombok annotation for constructor injection of final fields
public class RegistryController {
 */
@RestController
@RequestMapping("/registry") // set the base path
@RequiredArgsConstructor // Lombok annotation for constructor injection of final fields
public class RegistryController {

    // The SecurityService will be injected by Spring
    private final SecurityService securityService;

    // --- Authentication Endpoints (Using Map, No Explicit Controller Validation) ---

    /**
     * Handles user registration. Maps to /registry/signup.
     * Accepts JSON request body as a Map. No explicit validation in the controller.
     * Uses UserProfile.builder() to create the UserProfile object, including email and password.
     * Exceptions thrown by profile object creation or securityService.signUp are
     * handled by the global exception handler.
     *
     * @param requestBody The JSON request body automatically mapped to a Map, expected keys: "email", "password", (optionally other profile fields).
     * @return A ResponseEntity indicating success with a JSON body.
     * - 201 Created on success.
     * - Exception handling (e.g., 400, 409, 500) is delegated to the global handler.
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, String>> signUp(@RequestBody Map<String, String> requestBody) {
        // Safely get values from the map - does not validate presence or format
        String emailString = requestBody != null ? requestBody.get("email") : null;
        String passwordString = requestBody != null ? requestBody.get("password") : null;

        Email email = Email.safeCreate(emailString)
                             .orElseThrow(() -> new IllegalArgumentException("Invalid email format provided.")); // Example: throw if format is bad

        Password password = Password.create(passwordString); // Assuming create handles null/empty or bad format

        // Using UserProfile.builder() as confirmed by the UserProfile class
        UserProfile newUserProfile = UserProfile.builder()
                                    .email(email)
                                    .password(password)
                                    .build();

        securityService.signUp(newUserProfile);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "User registered successfully"));
    }

    /**
     * Handles user authentication (sign-in). Maps to /registry/signin.
     * Accepts JSON request body as a Map. No explicit validation in the controller.
     * Exceptions thrown by profile object creation or securityService.signIn are
     * handled by the global exception handler.
     *
     * @param requestBody The JSON request body automatically mapped to a Map, expected keys: "email", "password".
     * @return A ResponseEntity with the JWT token upon successful authentication (as a Map).
     * - 200 OK with token on success.
     * - Exception handling (e.g., 400, 401, 403, 500) is delegated to the global handler.
     */
    @PostMapping("/signin")
    public ResponseEntity<Map<String, String>> signIn(@RequestBody Map<String, String> requestBody) {
        // Safely get values from the map - does not validate presence or format
        String emailString = requestBody != null ? requestBody.get("email") : null;
        String passwordString = requestBody != null ? requestBody.get("password") : null;

        Email email = Email.safeCreate(emailString)
                       .orElseThrow(() -> new IllegalArgumentException("Invalid email format provided.")); // Example: throw if format is bad
        Password password = Password.create(passwordString); // Assuming create handles null/empty or bad format

        String jwtToken = securityService.signIn(email, password);
        
        return ResponseEntity.ok(Map.of("token", jwtToken));
    }

}

