package edu.webdev.catalog.analytic.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Ratio {
    private final double value;

    private Ratio(double value) {
        if (value < 0.0 || value > 1.0) {
            throw new IllegalArgumentException("Ratio must be between 0.0 and 1.0 inclusive.");
        }

        this.value = value;
    }

    public static Ratio create(int numerator, int denominator) {
        if (denominator == 0) {
            throw new IllegalArgumentException("Denominator cannot be zero.");
        }

        double value = (double) numerator / denominator;
        return new Ratio(value);
    }
}
