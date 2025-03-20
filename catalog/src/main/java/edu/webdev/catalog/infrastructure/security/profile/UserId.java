package edu.webdev.catalog.infrastructure.security.profile;

import java.util.UUID;

import edu.webdev.catalog.shared.exceptions.InvalidUserIdException;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class UserId {
    private UUID value;

    private UserId(UUID value) {
        this.value = value;
    }

    public static UserId create(UUID id) {
        if (id == null) {
            throw new InvalidUserIdException("UserId cannot be null");
        }

        return new UserId(id);
    }

    public static UserId fromString(String id) {
        try {
            UUID uuid = UUID.fromString(id);
            
            return new UserId(uuid);
        } catch (IllegalArgumentException e) {
            throw new InvalidUserIdException("Invalid UserId format", e);
        }
    }
}
