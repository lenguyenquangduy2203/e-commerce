package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Model {
    private final String value;

    private Model(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Model value cannot be null or empty");
        }

        if (value.length() > 100) {
            throw new IllegalArgumentException("Model value cannot exceed 100 characters");
        }

        this.value = value;
    }

    public static Model create(String value) {
        return new Model(value);
    }
}
