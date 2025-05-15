package edu.webdev.catalog.controllers;

import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;

import java.util.Map;
import java.util.HashMap;

// Specific authentication exceptions to handle (kept as they are thrown by Spring Security)
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.core.AuthenticationException;

// Import your custom exceptions
import edu.webdev.catalog.shared.exceptions.InvalidEmailException;
import edu.webdev.catalog.shared.exceptions.InvalidPasswordException;
import edu.webdev.catalog.shared.exceptions.InvalidUserIdException;


@ControllerAdvice
public class GlobalExceptionsHandler { // Consider renaming to GlobalExceptionHandler for consistency

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionsHandler.class);

    /**
     * Handles InvalidEmailException.
     * Returns a 400 BAD REQUEST.
     */
    @ExceptionHandler(InvalidEmailException.class)
    public ResponseEntity<Map<String, String>> handleInvalidEmailException(InvalidEmailException ex) {
        logger.warn("Invalid email exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handles InvalidPasswordException.
     * Returns a 400 BAD REQUEST.
     */
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<Map<String, String>> handleInvalidPasswordException(InvalidPasswordException ex) {
        logger.warn("Invalid password exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handles InvalidUserIdException.
     * Returns a 400 BAD REQUEST.
     */
    @ExceptionHandler(InvalidUserIdException.class)
    public ResponseEntity<Map<String, String>> handleInvalidUserIdException(InvalidUserIdException ex) {
        logger.warn("Invalid user ID exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

     /**
     * Handles generic IllegalArgumentException. This might still catch
     * IllegalArgumentExceptions thrown by other parts of the application
     * that are not specifically InvalidEmail/Password/UserId.
     * Returns a 400 BAD REQUEST.
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, String>> handleIllegalArgumentException(IllegalArgumentException ex) {
        logger.warn("Illegal argument exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        // Use the exception message as the error detail
        errorResponse.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }


    /**
     * Handles Spring Security's BadCredentialsException (e.g., incorrect password).
     * Returns a 401 UNAUTHORIZED.
     */
    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleBadCredentialsException(BadCredentialsException ex) {
        logger.warn("Bad credentials exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed: Invalid credentials");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Handles Spring Security's DisabledException (user account is disabled).
     * Returns a 403 FORBIDDEN.
     */
    @ExceptionHandler(DisabledException.class)
    public ResponseEntity<Map<String, String>> handleDisabledException(DisabledException ex) {
        logger.warn("Disabled account exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed: Account is disabled");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    /**
     * Handles Spring Security's LockedException (user account is locked).
     * Returns a 403 FORBIDDEN.
     */
    @ExceptionHandler(LockedException.class)
    public ResponseEntity<Map<String, String>> handleLockedException(LockedException ex) {
        logger.warn("Locked account exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed: Account is locked");
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    /**
     * Handles other general Spring Security AuthenticationExceptions not specifically handled above.
     * Returns a 401 UNAUTHORIZED.
     */
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<Map<String, String>> handleAuthenticationException(AuthenticationException ex) {
        logger.warn("Other authentication exception: {}", ex.getMessage());
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", "Authentication failed.");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Handles all other unhandled exceptions.
     * Returns a generic 500 INTERNAL SERVER ERROR.
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<EntityModel<String>> handleGenericException(Exception e) {
        // Log the full exception details for debugging
        logger.error("An unhandled error occurred: ", e);

        // Return a generic error message to the client
        EntityModel<String> error = EntityModel.of("An unexpected internal server error occurred. Please try again later.");

        // Use HttpStatus enum for clarity
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
}
