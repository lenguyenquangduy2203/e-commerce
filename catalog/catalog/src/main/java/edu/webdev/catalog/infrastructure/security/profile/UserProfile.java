package edu.webdev.catalog.infrastructure.security.profile;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class UserProfile {
    private UserId id;
    private Email email;
    private Password password;
    private UserRole role;
}
