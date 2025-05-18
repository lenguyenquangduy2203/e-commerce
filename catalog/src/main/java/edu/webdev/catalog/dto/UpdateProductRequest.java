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
@Builder
public class UpdateProductRequest {
    // @NotNull(message = "Product ID is required for update")
    private Long id;

    // Fields to update
    private String name;
    private String model;
    private String description;
    private BigDecimal price;
    private Integer stockQuantity;
    private String category;

    private String currency;
}
