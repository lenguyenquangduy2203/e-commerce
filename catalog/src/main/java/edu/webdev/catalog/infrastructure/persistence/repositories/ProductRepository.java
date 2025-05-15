package edu.webdev.catalog.infrastructure.persistence.repositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import edu.webdev.catalog.infrastructure.persistence.models.Product;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductDetail;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<ProductDetail> findProductDetailById(Long id);
    
    @Query("SELECT p FROM Product p WHERE (:spec IS NULL OR :spec = true)")
    <T> Page<T> findAllProjectedBy(Specification<Product> spec, Pageable pageable, Class<T> projection);
}
