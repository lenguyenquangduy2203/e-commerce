package edu.webdev.catalog.analytic.applications;

import java.time.Instant;
import java.time.ZoneId;
import java.util.List;

import org.springframework.stereotype.Service;

import edu.webdev.catalog.analytic.applications.queries.OrderVolumeQuery;
import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.infrastructure.persistence.repositories.OrderRepository;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.OrderVolumeByDate;
import edu.webdev.catalog.shared.base.QueryHandler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderVolumeQueryHandler implements QueryHandler<OrderVolumeQuery, List<OrderVolumeByDate>> {
    private final OrderRepository orderRepository;
    private final ZoneId zoneId = ZoneId.of("UTC");

    @Override
    public List<OrderVolumeByDate> handle(OrderVolumeQuery query) {
        DateRange range = query.getDateRange();
        Instant startDate = range.getStartDate().atStartOfDay(zoneId).toInstant();
        Instant endDate = range.getEndDate().atStartOfDay(zoneId).toInstant();

        return orderRepository.countByCreateAtBetween(startDate, endDate);
    }
}
