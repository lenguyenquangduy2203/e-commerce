package edu.webdev.catalog.controllers;

import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.slf4j.Logger;

@ControllerAdvice
public class GlobalExceptionsHandler {
    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionsHandler.class);

    @ExceptionHandler(Exception.class)
    public ResponseEntity<EntityModel<String>> handleGenericException(Exception e) {
        EntityModel<String> error = EntityModel.of("Internal server error");
        logger.error("An error occurred: ", e);

        return ResponseEntity.status(500).body(error);
    }
}
