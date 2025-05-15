package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.math.BigDecimal;

public interface ProductSummary {
    Long getId();
    String getName();
    String getModel();
    BigDecimal getAmount();
    String getCurrency();
    int getStockQuantity();
    String getCategory();
}
