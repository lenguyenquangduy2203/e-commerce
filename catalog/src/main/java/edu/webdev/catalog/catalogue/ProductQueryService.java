package edu.webdev.catalog.catalogue;

import org.springframework.data.domain.Page;

import edu.webdev.catalog.catalogue.applications.queries.RetrieveProductQuery;
import edu.webdev.catalog.catalogue.applications.queries.SearchProductQuery;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSummary;

public interface ProductQueryService {
    ProductDetail findProductById(RetrieveProductQuery query);
    Page<ProductSummary> searchPageOfProduct(SearchProductQuery query);
}
