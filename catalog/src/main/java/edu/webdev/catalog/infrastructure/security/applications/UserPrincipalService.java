package edu.webdev.catalog.infrastructure.security.applications;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.infrastructure.persistence.repositories.UserRepository;
import edu.webdev.catalog.infrastructure.security.principal.UserPrincipal;
import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.UserId;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserPrincipalService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String input) throws UsernameNotFoundException {
        return new UserPrincipal(
            UserId.safeCreate(input)
                .flatMap(id -> userRepository.findById(id.getValue()))
                .or(() -> Email.safeCreate(input)
                    .flatMap(email -> userRepository.findByEmail(email.getValue())))
                .orElseThrow(() -> new UsernameNotFoundException("User not found with input: " + input))
        );
    }
    
}
