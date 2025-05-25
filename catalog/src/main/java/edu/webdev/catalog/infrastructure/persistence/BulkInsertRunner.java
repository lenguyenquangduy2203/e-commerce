package edu.webdev.catalog.infrastructure.persistence;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Component
public class BulkInsertRunner implements ApplicationRunner {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    @Transactional
    public void run(ApplicationArguments args) throws Exception {
        try (var reader = new BufferedReader(new InputStreamReader(
                getClass().getClassLoader().getResourceAsStream("db/data/bulk-insert.sql")))) {
            String sql = reader.lines().collect(Collectors.joining("\n"));
            for (String statement : sql.split(";")) {
                String trimmed = statement.trim();
                if (!trimmed.isEmpty()) {
                    entityManager.createNativeQuery(trimmed).executeUpdate();
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to run bulk-insert.sql", e);
        }
    }

}
