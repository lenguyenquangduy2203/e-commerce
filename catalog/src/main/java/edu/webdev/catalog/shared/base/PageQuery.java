package edu.webdev.catalog.shared.base;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public interface PageQuery<T, R> extends Query<R>, SpecificationBuilder<T> {
    int getPageNumber();

    int getPageSize();

    String getSortBy();

    String getSortOrder();

    default boolean isAscending() {
        return "asc".equalsIgnoreCase(getSortOrder());
    }

    default boolean isDescending() {
        return "desc".equalsIgnoreCase(getSortOrder());
    }

    default Pageable toPageable() {
        return PageRequest.of(
            getPageNumber(), 
            getPageSize(), 
            isAscending() ? 
                Sort.by(getSortBy()).ascending() 
            : 
                Sort.by(getSortBy()).descending());
    }
}
