package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class ProductId {
    private final Long value;

    private ProductId(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("Product ID must be a positive number");
        }

        this.value = id;
    }

    public static ProductId of(Long id) {
        return new ProductId(id);
    }
}
