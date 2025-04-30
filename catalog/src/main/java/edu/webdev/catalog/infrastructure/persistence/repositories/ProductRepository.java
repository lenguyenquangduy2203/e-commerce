package edu.webdev.catalog.infrastructure.persistence.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.webdev.catalog.infrastructure.persistence.models.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {}
