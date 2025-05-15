package edu.webdev.catalog.shared.base;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;

public interface SpecificationBuilder<T> {
    List<Specification<T>> buildSpecifications();
}
