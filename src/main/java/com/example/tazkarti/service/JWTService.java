package com.example.tazkarti.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JWTService {
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    @Value("${jwt.expiration}")
    private Long EXPIRATION_TIME_MILLIS;

    public String generateJwt(Long userId, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("role", role);
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATION_TIME_MILLIS);
        return Jwts.builder()
                   .setClaims(claims)
                   .setIssuedAt(now)
                   .setExpiration(expirationDate)
                   .signWith(SignatureAlgorithm.HS256, this.SECRET_KEY)
                   .compact();
    }

    public Claims parseJwt(String jwt) {
        return Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(jwt).getBody();
    }

    public boolean isJwtValid(String jwt) {
        try {
            Jwts.parser().setSigningKey(this.SECRET_KEY).parseClaimsJws(jwt);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Long getUserIdFromJwt(String jwt) {
        Claims claims = parseJwt(jwt);
        return claims.get("userId", Long.class);
    }

    public String getRoleFromJwt(String jwt) {
        Claims claims = parseJwt(jwt);
        return claims.get("role", String.class);
    }
}