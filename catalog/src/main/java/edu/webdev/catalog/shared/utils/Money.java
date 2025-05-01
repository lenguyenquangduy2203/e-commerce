package edu.webdev.catalog.shared.utils;

import java.math.BigDecimal;
import java.util.Currency;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

import java.math.RoundingMode;

@Getter
@ToString
@EqualsAndHashCode
public class Money {
    private final BigDecimal amount;
    private final Currency currency;

    private Money(BigDecimal amount, Currency currency) {
        if (amount == null || currency == null) {
            throw new IllegalArgumentException("Amount and currency cannot be null");
        }

        if (amount.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("Amount cannot be negative");
            
        }

        this.amount = amount.setScale(2, RoundingMode.HALF_UP);
        this.currency = currency;
    }

    public static Money create(BigDecimal amount, Currency currency) {
        return new Money(amount, currency);
    }
}
