package edu.webdev.catalog.shared.base;

import edu.webdev.catalog.analytic.domain.DateRange;

public interface DateRangeQuery<T> extends Query<T> {
    DateRange getDateRange();
}
