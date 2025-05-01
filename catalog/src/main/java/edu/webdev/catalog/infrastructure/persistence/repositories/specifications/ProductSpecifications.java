package edu.webdev.catalog.infrastructure.persistence.repositories.specifications;

import java.math.BigDecimal;

import org.springframework.data.jpa.domain.Specification;

import edu.webdev.catalog.catalogue.applications.queries.SearchProductQuery;
import edu.webdev.catalog.infrastructure.persistence.models.Product;

public class ProductSpecifications {
    private static final String PRICE_AMOUNT = "amount";

    private ProductSpecifications() {}

    public static Specification<Product> inStock() {
        return (root, query, criteriaBuilder) -> criteriaBuilder
            .greaterThan(root.get("stockQuantity"), 0);
    }

    public static Specification<Product> priceCondition(BigDecimal price, SearchProductQuery.PriceOperator operator) {
        return (root, query, criteriaBuilder) -> {
            switch (operator) {
                case LESS_THAN:
                    return criteriaBuilder.lessThan(root.get(PRICE_AMOUNT), price);
                case GREATER_THAN:
                    return criteriaBuilder.greaterThan(root.get(PRICE_AMOUNT), price);
                case EQUALS:
                    return criteriaBuilder.equal(root.get(PRICE_AMOUNT), price);
                default:
                    throw new IllegalArgumentException("Invalid operator: " + operator);
            }
        };
    }

    public static Specification<Product> nameCategoryDescriptionContains(String keyword) {
        return (root, query, criteriaBuilder) -> {
            String pattern = "%" + keyword.toLowerCase() + "%";
            return criteriaBuilder.or(
                criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), pattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("category")), pattern),
                criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern)
            );
        };
    }
}
