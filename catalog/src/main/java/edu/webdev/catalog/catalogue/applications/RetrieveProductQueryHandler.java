package edu.webdev.catalog.catalogue.applications;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.catalogue.applications.queries.RetrieveProductQuery;
import edu.webdev.catalog.infrastructure.persistence.repositories.ProductRepository;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;
import edu.webdev.catalog.shared.base.QueryHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RetrieveProductQueryHandler implements QueryHandler<RetrieveProductQuery, ProductDetail> {
    private final ProductRepository productRepository;
    
    @Override
    public ProductDetail handle(RetrieveProductQuery query) {
        return productRepository.findProductDetailById(query.id().getValue())
            .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }
}
