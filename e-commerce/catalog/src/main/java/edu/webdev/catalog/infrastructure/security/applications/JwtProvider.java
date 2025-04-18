package edu.webdev.catalog.infrastructure.security.applications;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.webdev.catalog.infrastructure.security.profile.UserId;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Service
public class JwtProvider {
    @Value("${jwt.secrete-key}")
    private String secreteKey;

    @Value("${jwt.expiration-time:1440000}") // Default to 24 minutes in milliseconds
    private long expirationTime;

    @PostConstruct
    public void validateSecretKey() {
        if (this.secreteKey == null || this.secreteKey.isBlank()) {
            throw new IllegalStateException("JWT secret key is not configured. Please set 'jwt.secrete-key' in the environment or application.properties.");
        }
    }

    public String createToken(UserId subject) {
        return generateTokenWithUserIdAsSubject(new HashMap<>(), subject);
    }

    public String createToken(UserId subject, Map<String, Object> extraClaims) {
        return generateTokenWithUserIdAsSubject(extraClaims, subject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public boolean isTokenValid(String token) {
        try {
            // validates the token's signature using the secret key in the extractAllClaims
            // prepare for future use if there are extra claims needed to be validate
            extractAllClaims(token); 

            return !isTokenExpired(token);    
        } catch (Exception e) {
            return false;
        }
    }

    private String generateTokenWithUserIdAsSubject(Map<String, Object> extraClaims, UserId id) {
        return Jwts.builder()
        .setClaims(extraClaims)
        .setSubject(id.getValue().toString())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid JWT token", e);
        }    
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(String token) {
        Date expiration = extractExpiration(token);
        // To account for clock skew between systems, add a small buffer (e.g., 1 minute) when checking token expiration.
        return expiration.before(new Date(System.currentTimeMillis() - 60000));
    }

    private Key getSignInKey() {
        if (this.secreteKey == null || this.secreteKey.isBlank()) {
            throw new IllegalStateException("JWT secret key is not configured");
        }

        byte[] keyBytes = Decoders.BASE64.decode(this.secreteKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
