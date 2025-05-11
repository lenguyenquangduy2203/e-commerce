package edu.webdev.catalog.analytic.applications.queries;

import java.util.List;

import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSales;
import edu.webdev.catalog.shared.base.DateRangeQuery;
import lombok.Builder;

@Builder
public class TopSellingProductQuery implements DateRangeQuery<List<ProductSales>> {
    private final DateRange dateRange;

    @Override
    public DateRange getDateRange() {
        return this.dateRange;
    }
}
