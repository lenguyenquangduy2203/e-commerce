package edu.webdev.catalog.infrastructure.security.applications;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.infrastructure.persistence.models.Cart;
import edu.webdev.catalog.infrastructure.persistence.models.User;
import edu.webdev.catalog.infrastructure.persistence.repositories.UserRepository;
import edu.webdev.catalog.infrastructure.security.SecurityService;
import edu.webdev.catalog.infrastructure.security.principal.UserPrincipal;
import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.Password;
import edu.webdev.catalog.infrastructure.security.profile.UserId;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;
import edu.webdev.catalog.infrastructure.security.profile.UserRole;
import edu.webdev.catalog.shared.mappers.UserProfileMapper;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecurityServiceImpl implements SecurityService {
    private final Logger logger = LoggerFactory.getLogger(SecurityServiceImpl.class);
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final UserProfileMapper userProfileMapper;

    @Override
    @Transactional
    public void signUp(UserProfile profile) {
        Password encodedPassword = Password.create(passwordEncoder.encode(profile.getPassword().getValue()));
        profile.setPassword(encodedPassword);
        User user = userProfileMapper.toPersistence(profile);
        if (profile.getRole() == UserRole.ROLE_USER) {
            Cart cart = new Cart();
            cart.setUser(user);
            user.setCart(cart);
        }

        userRepository.save(user);
    }

    @Override
    public String signIn(Email email, Password password) {
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email.getValue(), password.getValue())
        );
        if (authentication.getPrincipal() instanceof UserPrincipal userPrincipal) {
            UserId id = userPrincipal.getId();
            List<String> authorities = userPrincipal.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
            
            return jwtProvider.createToken(id, Map.of("authorities", authorities));
        } else {
            logger.error("Expected UserPrincipal but got: {}", authentication.getPrincipal().getClass().getName());
            throw new IllegalStateException("Authentication principal is not of type UserPrincipal");
        }
    }
}
