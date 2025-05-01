package edu.webdev.catalog.catalogue.applications;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.applications.queries.SearchProductQuery;
import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.ProductRepository;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSummary;
import edu.webdev.catalog.shared.base.QueryHandler;
import edu.webdev.catalog.shared.utils.SpecificationUtils;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SearchProductQueryHandler implements QueryHandler<SearchProductQuery, Page<ProductSummary>> {
    private final ProductRepository productRepository;

    @Override
    public Page<ProductSummary> handle(SearchProductQuery query) {
        Specification<Product> spec = SpecificationUtils.combine(query.buildSpecifications());
        Pageable pageable = query.toPageable();
        return productRepository.findAll(spec, pageable, ProductSummary.class);
    }
}
