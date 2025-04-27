package edu.webdev.catalog.controllers;

import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;

import java.util.HashMap;
import java.util.Map;


@ControllerAdvice
public class GlobalExceptionsHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionsHandler.class);

    /**
     * Handles validation errors for @RequestBody parameters annotated with @Valid.
     * Returns a 400 BAD REQUEST with a map of validation errors.
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        // Returns a 400 Bad Request with a map of field names to error messages in JSON
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errors);
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

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error); // Use HttpStatus enum
    }

}