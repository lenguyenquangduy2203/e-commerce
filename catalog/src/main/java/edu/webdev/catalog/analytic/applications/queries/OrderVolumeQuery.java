package edu.webdev.catalog.analytic.applications.queries;

import java.util.List;

import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.OrderVolumeByDate;
import edu.webdev.catalog.shared.base.DateRangeQuery;
import lombok.Builder;

@Builder
public class OrderVolumeQuery implements DateRangeQuery<List<OrderVolumeByDate>> {
    private final DateRange dateRange;

    @Override
    public DateRange getDateRange() {
        return this.dateRange;
    }
}
