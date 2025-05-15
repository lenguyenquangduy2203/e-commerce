package edu.webdev.catalog.infrastructure.persistence.repositories;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.webdev.catalog.infrastructure.persistence.models.OrderItem;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.ProductSales;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    @Query("""
        SELECT 
            oi.productName AS productName,
            oi.productModel AS productModel,
            SUM(oi.quantity) AS quantity
        FROM OrderItem oi
        WHERE oi.order.createAt BETWEEN :startDate AND :endDate
        GROUP BY oi.productName, oi.productModel
        ORDER BY SUM(oi.quantity) DESC     
    """)
    List<ProductSales> findTopSellingProducts(
        @Param("startDate") Instant startDate, @Param("endDate") Instant endDate
    );
}
