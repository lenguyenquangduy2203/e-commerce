package edu.webdev.catalog.catalogue.applications.queries;

import edu.webdev.catalog.catalogue.domain.ProductId;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;
import edu.webdev.catalog.shared.base.Query;

public record RetrieveProductQuery(
    ProductId id
) implements Query<ProductDetail> {}
