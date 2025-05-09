package edu.webdev.catalog.analytic.domain;

import java.time.LocalDate;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class DateRange {
    private final LocalDate startDate;
    private final LocalDate endDate;

    private DateRange(LocalDate start, LocalDate end) {
        if (start == null || end == null) {
            throw new IllegalArgumentException("Both start and end date are required.");
        }

        if (start.isAfter(end)) {
            throw new IllegalArgumentException("Start date cannot be after end date.");
        }

        if (end.isAfter(LocalDate.now())) {
            throw new IllegalArgumentException("End date cannot be after today.");
        }

        this.startDate = start;
        this.endDate = end;
    }

    public static DateRange create(LocalDate startDate, LocalDate endDate) {
        return new DateRange(startDate, endDate);
    }
}
