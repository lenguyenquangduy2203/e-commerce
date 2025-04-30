package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Description {
    private final String value;

    private Description(String value) {
        if (value == null || value.isBlank()) {
            throw new IllegalArgumentException("Description value cannot be null or empty");
        }

        if (value.length() > 1000) {
            throw new IllegalArgumentException("Description value cannot exceed 1000 characters");
        }

        this.value = value;
    }

    public static Description create(String value) {
        return new Description(value);
    }
}
