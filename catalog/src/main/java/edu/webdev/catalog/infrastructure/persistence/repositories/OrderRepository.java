package edu.webdev.catalog.infrastructure.persistence.repositories;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.webdev.catalog.infrastructure.persistence.models.Order;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.OrderVolumeByDate;
import edu.webdev.catalog.infrastructure.persistence.repositories.projections.UserIdByOrderCreateAt;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("""
        SELECT o.user.id AS userId, o.createAt AS createAt
        FROM Order o
        WHERE o.createAt BETWEEN :start AND :end
    """)
    List<UserIdByOrderCreateAt> findUserIdByOrderCreateAtBetween(
        @Param("start") Instant start, 
        @Param("end") Instant end
    );
    
    @Query("""
        SELECT 
            DATE(o.createAt) AS createDate, 
            COUNT(o) AS amount
        FROM Order o
        WHERE o.createAt BETWEEN :start AND :end
        GROUP BY DATE(o.createAt)
    """)
    List<OrderVolumeByDate> countByCreateAtBetween(
        @Param("start") Instant start, 
        @Param("end") Instant end
    );
}
