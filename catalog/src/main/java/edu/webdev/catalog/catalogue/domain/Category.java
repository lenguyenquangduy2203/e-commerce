package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Category {
    private final String value;

    private Category(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Category value cannot be null or empty");
        }

        if (value.length() > 100) {
            throw new IllegalArgumentException("Category value cannot exceed 100 characters");
        }

        this.value = value;
    }

    public static Category create(String value) {
        return new Category(value);
    }
}
