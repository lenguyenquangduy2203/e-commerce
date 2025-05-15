package edu.webdev.catalog.catalogue.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class StockQuantity {
    private final int value;

    private StockQuantity(int value) {
        if (value < 0) {
            throw new IllegalArgumentException("Stock quantity cannot be negative");
        }

        if (value > 10000) {
            throw new IllegalArgumentException("Stock quantity cannot exceed 10000");
        }

        this.value = value;
    }

    public static StockQuantity create(int value) {
        return new StockQuantity(value);
    }
}
