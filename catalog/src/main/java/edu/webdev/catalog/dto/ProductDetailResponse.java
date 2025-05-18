package edu.webdev.catalog.dto;

import java.math.BigDecimal;

// Using Lombok for boilerplate
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.Builder;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailResponse {
    private Long id;
    private String name;
    private String model;
    private String description;
    private BigDecimal price;
    private String currency;
    private Integer stockQuantity;
    private String category;
}
