package edu.webdev.catalog.dto;

import java.math.BigDecimal;

// Using Lombok for boilerplate
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder; // Import Builder


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder // Added @Builder here
public class CreateProductRequest {
    // @NotBlank(message = "Name is required")
    private String name;

    // @NotBlank(message = "Model is required")
    private String model;

    // @NotBlank(message = "Description is required")
    private String description;

    // @NotNull(message = "Price is required")
    // @Positive(message = "Price must be positive")
    private BigDecimal price;

    // @NotNull(message = "Stock quantity is required")
    // @PositiveOrZero(message = "Stock quantity must be non-negative")
    private Integer stockQuantity;

    // @NotBlank(message = "Category is required")
    private String category;

    // @NotBlank(message = "Currency is required")
    private String currency;
}
