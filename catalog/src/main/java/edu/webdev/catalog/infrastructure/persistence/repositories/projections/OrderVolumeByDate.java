package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.time.LocalDate;

public interface OrderVolumeByDate {
    LocalDate getCreateDate();
    Integer getAmount();
}
