package edu.webdev.catalog.dto;
import jakarta.validation.constraints.NotBlank;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import lombok.Data;


// Using Lombok for boilerplate code
@NoArgsConstructor
@AllArgsConstructor

@Data // Includes boilerplate methods like getters, setters, and toString
public class ServiceRegistrationRequest {

    @NotBlank(message = "Service name is required")
    private String name;

    @NotBlank(message = "Service URL is required")
    private String url;

    // Validation annotations (@NotBlank) ensure input validation.
}    // Validation annotations ensure input constraints.
