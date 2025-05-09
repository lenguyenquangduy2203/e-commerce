package edu.webdev.catalog.analytic.domain;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class UserAmount {
    private final int value;

    private UserAmount(int amount) {
        if (amount < 0) {
            throw new IllegalArgumentException("User amount cannot be negative.");
        }

        this.value = amount;
    }

    public static UserAmount create(int amount) {
        return new UserAmount(amount);
    }
}
