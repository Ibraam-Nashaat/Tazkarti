package com.example.tazkarti.enums;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public enum UserRole {
    ADMIN("ADMIN"),
    FAN("FAN"),
    MANAGER("MANAGER");

    private final String displayName;

    UserRole(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }
    public static UserRole fromString(String role) {
        for (UserRole userRole : UserRole.values()) {
            if (userRole.name().equalsIgnoreCase(role)) {
                return userRole;
            }
        }
        throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST, "Invalid role: "+role
        );
    }

}
