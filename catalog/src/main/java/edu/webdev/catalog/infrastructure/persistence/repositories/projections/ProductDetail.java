package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.math.BigDecimal;

public interface ProductDetail {
    Long getId();
    String getName();
    String getModel();
    String getDescription();
    BigDecimal getAmount();
    String getCurrency();
    int getStockQuantity();
    String getCategory();
}
