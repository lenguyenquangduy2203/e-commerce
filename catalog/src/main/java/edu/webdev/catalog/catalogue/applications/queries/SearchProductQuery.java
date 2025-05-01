package edu.webdev.catalog.catalogue.applications.queries;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSummary;
import edu.webdev.catalog.infrastructure.persistence.repositories.specifications.ProductSpecifications;
import edu.webdev.catalog.shared.base.PageQuery;
import lombok.Builder;

@Builder
public class SearchProductQuery implements PageQuery<Product, Page<ProductSummary>> {
    private String keyword;
    private BigDecimal price;
    private PriceOperator priceOperator;
    private Integer page;
    private Integer size;
    private String sortBy;
    private Sort.Direction sortDirection;

    @Override
    public List<Specification<Product>> buildSpecifications() {
        List<Specification<Product>> specs = new ArrayList<>();
        if (keyword != null && !keyword.isBlank()) {
            specs.add(ProductSpecifications.nameCategoryDescriptionContains(keyword));
        }

        if (price != null && priceOperator != null) {
            specs.add(ProductSpecifications.priceCondition(price, priceOperator));
        }

        return specs;
    }

    @Override
    public int getPageNumber() {
        return page == null ? 0 : page;
    }

    @Override
    public int getPageSize() {
        return size == null ? 10 : size;
    }

    @Override
    public String getSortBy() {
        return sortBy == null ? "id" : sortBy;
    }

    @Override
    public String getSortOrder() {
        return sortDirection == null ? "asc" : sortDirection.name().toLowerCase();
    }

    public enum PriceOperator {
        LESS_THAN,
        GREATER_THAN,
        EQUALS,
    }
}
