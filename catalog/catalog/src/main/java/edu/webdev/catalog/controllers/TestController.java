package edu.webdev.catalog.controllers;

import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.mvc.WebMvcLinkBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
@CrossOrigin
public class TestController {
    @GetMapping
    public ResponseEntity<EntityModel<ApiResponse>> test() {
        ApiResponse response = new ApiResponse("API is working!");

        EntityModel<ApiResponse> entityModel = EntityModel.of(
            response,
            WebMvcLinkBuilder.linkTo(WebMvcLinkBuilder.methodOn(TestController.class).test()).withSelfRel()
        );

        return ResponseEntity.ok(entityModel);
    }

    static class ApiResponse {
        private String message;

        public ApiResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}
