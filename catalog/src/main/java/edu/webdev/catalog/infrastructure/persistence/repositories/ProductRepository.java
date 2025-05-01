package edu.webdev.catalog.infrastructure.persistence.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<ProductDetail> findProductDetailById(Long id);
}
