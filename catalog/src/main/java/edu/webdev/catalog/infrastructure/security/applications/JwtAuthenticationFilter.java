package edu.webdev.catalog.infrastructure.security.applications;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtProvider jwtProvider;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String subject;
        logger.info(authHeader);
        if (authHeader == null || !authHeader.trim().startsWith("Bearer ")) {
            logger.warn("Authorization header is missing or not prefixed with 'Bearer'");
            filterChain.doFilter(request, response);

            return;
        }

        jwt = authHeader.substring(7);
        subject = jwtProvider.extractSubject(jwt);
        if (subject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(subject);
            if (jwtProvider.isTokenValid(jwt)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities()
                );
                authToken.setDetails(userDetails);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } else {
            logger.warn("Subject is null or already authenticated");
        }

        filterChain.doFilter(request, response);
    }
}
