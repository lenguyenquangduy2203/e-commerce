package edu.webdev.catalog.analytic.applications.queries;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import edu.webdev.catalog.analytic.domain.DateRange;
import edu.webdev.catalog.analytic.domain.Ratio;
import edu.webdev.catalog.analytic.domain.UserAmountByType;
import edu.webdev.catalog.shared.base.DateRangeQuery;
import lombok.Builder;

@Builder
public class UserAnalysisQuery implements DateRangeQuery<List<UserAmountByType>> {
    private final DateRange dateRange;
    private final Ratio ratio;

    @Override
    public DateRange getDateRange() {
        return this.dateRange;
    }
    
    public Ratio getRatio() {
        return this.ratio;
    }

    public DateRange getRecentRange() {
        LocalDate endDate = dateRange.getEndDate();
        LocalDate startDate = dateRange.getStartDate();
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate);
        long dividedPoint = Math.round(totalDays * ratio.getValue());
        LocalDate recentStartDate = endDate.minusDays(dividedPoint);
        
        return DateRange.create(recentStartDate, endDate);
    }

    public DateRange getCompareRange() {
        LocalDate endDate = dateRange.getEndDate();
        LocalDate startDate = dateRange.getStartDate();
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate);
        long dividedPoint = Math.round(totalDays * (1 - ratio.getValue()));
        LocalDate compareEndDate = endDate.minusDays(dividedPoint);
        
        return DateRange.create(startDate, compareEndDate);
    }
}
