package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.math.BigDecimal;

public record ProductSummary(
    Long id,
    String name,
    String model,
    BigDecimal amount,
    String currency,
    int stockQuantity,
    String category
) {}
