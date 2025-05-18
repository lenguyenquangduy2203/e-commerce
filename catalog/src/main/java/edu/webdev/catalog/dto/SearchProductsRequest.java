package edu.webdev.catalog.dto;

import java.math.BigDecimal;

// Using Lombok for boilerplate
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;
import lombok.Builder.Default;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SearchProductsRequest {
    // Fields for search criteria (query parameters)
    private String name;
    private String model;
    private String category;

    @Default
    private int page = 0; // Default page number
    @Default
    private int size = 10; // Default page size
    @Default
    private String sortBy = "name"; // Default sort field
    @Default
    private String sortDirection = "asc"; // Default sort direction

    // Optional search criteria
    private Boolean inStock; // To search for in-stock products

    // Added fields for price filtering
    private BigDecimal price;
    private String priceOperator;
}
