package edu.webdev.catalog.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import edu.webdev.catalog.analytic.applications.OrderVolumeQueryHandler;
import edu.webdev.catalog.analytic.applications.TopSellingProductQueryHandler;
import edu.webdev.catalog.analytic.applications.UserAnalysisQueryHandler;
import edu.webdev.catalog.analytic.applications.queries.OrderVolumeQuery;
import edu.webdev.catalog.analytic.applications.queries.TopSellingProductQuery;
import edu.webdev.catalog.analytic.applications.queries.UserAnalysisQuery;
import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.analytic.domain.Ratio;
import edu.webdev.catalog.analytic.domain.UserAmountByType;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.OrderVolumeByDate;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSales;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticController {
    private final UserAnalysisQueryHandler userAnalysisQueryHandler;
    private final TopSellingProductQueryHandler topSellingProductQueryHandler;
    private final OrderVolumeQueryHandler orderVolumeQueryHandler;

    @GetMapping("/users")
    public List<UserAmountByType> getUserAnalysis(
        @RequestParam LocalDate startDate, 
        @RequestParam LocalDate endDate,
        @RequestParam(defaultValue = "2") int numerator,
        @RequestParam(defaultValue = "3") int denominator
    ) {
        var query = UserAnalysisQuery.builder()
            .dateRange(DateRange.create(startDate, endDate))
            .ratio(Ratio.create(numerator, denominator))
            .build();

        return userAnalysisQueryHandler.handle(query);
    }

    @GetMapping("/sales")
    public List<ProductSales> getTopSellingProduct(
        @RequestParam LocalDate startDate, 
        @RequestParam LocalDate endDate
    ) {
        var query = TopSellingProductQuery.builder()
            .dateRange(DateRange.create(startDate, endDate))
            .build();

        return topSellingProductQueryHandler.handle(query);
    }

    @GetMapping("/orders")
    public List<OrderVolumeByDate> getOrderVolume(
        @RequestParam LocalDate startDate, 
        @RequestParam LocalDate endDate
    ) {
        var query = OrderVolumeQuery.builder()
            .dateRange(DateRange.create(startDate, endDate))
            .build();

        return orderVolumeQueryHandler.handle(query);
    }
}
