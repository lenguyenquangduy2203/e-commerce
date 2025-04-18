package edu.webdev.catalog.infrastructure.security;

import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.Password;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;

public interface SecurityService {
    void signUp(UserProfile profile);
    String signIn(Email email, Password password);
}
