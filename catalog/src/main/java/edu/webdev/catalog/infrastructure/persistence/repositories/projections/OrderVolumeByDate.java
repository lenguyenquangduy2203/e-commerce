package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.time.Instant;

public interface OrderVolumeByDate {
    Instant getCreateDate();
    Integer getAmount();
}
