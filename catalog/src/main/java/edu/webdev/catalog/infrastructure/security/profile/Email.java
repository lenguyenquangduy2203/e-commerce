package edu.webdev.catalog.infrastructure.security.profile;

import java.util.Optional;
import java.util.regex.Pattern;

import edu.webdev.catalog.shared.exceptions.InvalidEmailException;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@EqualsAndHashCode
public class Email {
    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$"
    );

    private String value;

    private Email(String value) {
        this.value = value;
    }

    public static Email create(String email) {
        if (email == null || email.isBlank()) {
            throw new InvalidEmailException("Email cannot be null or blank");
        }
        
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            throw new InvalidEmailException("Invalid email format");
        }

        return new Email(email);
    }

    /**
     * This method only be used when failures are expected and part of the normal workflow.
     * @param email a String that need to be validated.
     * @return an Optional of Email
     */
    public static Optional<Email> safeCreate(String email) {
        if (email == null || email.isBlank()) {
            return Optional.empty();
        }
        
        if (!EMAIL_PATTERN.matcher(email).matches()) {
            return Optional.empty();
        }

        return Optional.of(new Email(email));
    }
}
