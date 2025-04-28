package edu.webdev.catalog.shared.utils;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public class SpecificationUtils {
    private SpecificationUtils() {}

    public static <T> Specification<T> combine(List<Specification<T>> specs) {
        Specification<T> result = Specification.where(null);
        for (Specification<T> spec : specs) {
            result = result.and(spec);
        }
        
        return result;
    }
}
