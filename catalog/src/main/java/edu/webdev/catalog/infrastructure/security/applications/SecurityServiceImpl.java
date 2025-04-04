package edu.webdev.catalog.infrastructure.security.applications;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.infrastructure.persistence.repositories.UserRepository;
import edu.webdev.catalog.infrastructure.security.SecurityService;
import edu.webdev.catalog.infrastructure.security.principal.UserPrincipal;
import edu.webdev.catalog.infrastructure.security.profile.Email;
import edu.webdev.catalog.infrastructure.security.profile.Password;
import edu.webdev.catalog.infrastructure.security.profile.UserId;
import edu.webdev.catalog.infrastructure.security.profile.UserProfile;
import edu.webdev.catalog.shared.mappers.UserProfileMapper;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class SecurityServiceImpl implements SecurityService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final AuthenticationManager authenticationManager;
    private final UserProfileMapper userProfileMapper;

    @Override
    public void signUp(UserProfile profile) {
        Password encodedPassword = Password.create(passwordEncoder.encode(profile.getPassword().getValue()));
        profile.setPassword(encodedPassword);
        userRepository.save(userProfileMapper.toPersistence(profile));
    }

    @Override
    public String signIn(Email email, Password password) {
        var authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(email.getValue(), password.getValue())
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
        UserId id = userPrincipal.getId();
            
        return jwtProvider.createToken(id);
    }
}
