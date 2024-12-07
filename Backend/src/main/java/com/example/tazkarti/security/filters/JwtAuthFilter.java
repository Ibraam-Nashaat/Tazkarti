package com.example.tazkarti.security.filters;


import com.example.tazkarti.service.JWTService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    @Autowired
    public JwtAuthFilter(JWTService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        if (requestURI.startsWith("/api/v1/auth") || requestURI.startsWith("/api/v1/matches")) {
            filterChain.doFilter(request, response);
            return;
        }

        String authorizationHeader = request.getHeader("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String jwt = authorizationHeader.substring(7); // Remove "Bearer " prefix

            if (jwtService.isJwtValid(jwt)) {
                // Optionally, you can set the user details in the request context
                Long userId = jwtService.getUserIdFromJwt(jwt);
                String role = jwtService.getRoleFromJwt(jwt);

                // Set user details as request attributes if needed
                request.setAttribute("userId", userId);
                request.setAttribute("role", role);
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
                return; // Stop further processing if the token is invalid
            }
        } else {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authorization header missing or malformed");
            return; // Stop further processing if the token is missing
        }

        filterChain.doFilter(request, response); // Continue with the filter chain
    }
}
