package edu.webdev.catalog.analytic.applications;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.analytic.applications.queries.TopSellingProductQuery;
import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.infrastructure.persistence.repositories.OrderItemRepository;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSales;
import edu.webdev.catalog.shared.base.QueryHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TopSellingProductQueryHandler implements QueryHandler<TopSellingProductQuery, List<ProductSales>> {
    private final OrderItemRepository orderItemRepository;
    private final ZoneId zoneId = ZoneId.of("UTC");

    @Override
    public List<ProductSales> handle(TopSellingProductQuery query) {
        DateRange range = query.getDateRange();
        Instant startDate = range.getStartDate().atStartOfDay(zoneId).toInstant();
        Instant endDate = range.getEndDate().atStartOfDay(zoneId).toInstant();
        
        return orderItemRepository.findTopSellingProducts(startDate, endDate);
    }
}
