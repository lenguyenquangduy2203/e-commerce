package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class ProductName {
    private final String value;

    private ProductName(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Product value cannot be null or empty");
        }

        if (value.length() > 100) {
            throw new IllegalArgumentException("Product value cannot exceed 100 characters");
        }

        this.value = value;
    }

    public static ProductName create(String value) {
        return new ProductName(value);
    }
}
