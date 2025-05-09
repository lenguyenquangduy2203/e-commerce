package edu.webdev.catalog.analytic.domain;

public record UserAmountByType(
    UserType userType,
    UserAmount amount
) {}
