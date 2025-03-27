package edu.webdev.catalog.infrastructure.security.profile;

import edu.webdev.catalog.shared.exceptions.InvalidPasswordException;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Password {
    private String value;

    private Password(String value) {
        this.value = value;
    }

    public static Password create(String password) {
        if (password == null || password.isBlank()) {
            throw new InvalidPasswordException("Password cannot be null or blank");
        }

        return new Password(password);
    }
}
