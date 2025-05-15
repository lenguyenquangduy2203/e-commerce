package edu.webdev.catalog.infrastructure.persistence.repositories.projections;

import java.time.Instant;
import java.util.UUID;

public interface UserIdByOrderCreateAt {
    UUID getUserId();
    Instant getCreateAt();
}
