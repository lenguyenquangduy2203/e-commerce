package edu.webdev.catalog.catalogue.applications;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.ProductQueryService;
import edu.webdev.catalog.catalogue.applications.queries.RetrieveProductQuery;
import edu.webdev.catalog.catalogue.applications.queries.SearchProductQuery;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSummary;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductQueryServiceImpl implements ProductQueryService {
    private final SearchProductQueryHandler searchProductQueryHandler;
    private final RetrieveProductQueryHandler retrieveProductQueryHandler;

    @Override
    public ProductDetail findProductById(RetrieveProductQuery query) {
        return retrieveProductQueryHandler.handle(query);
    }

    @Override
    public Page<ProductSummary> searchPageOfProduct(SearchProductQuery query) {
        return searchProductQueryHandler.handle(query);
    }

}
