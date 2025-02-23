package com.example.tazkarti.enums;


public enum AccountStatus {
    PENDING("PENDING"),
    ACTIVE("ACTIVE"),
    NOT_ACTIVE("NOT_ACTIVE");

    private final String displayName;

    AccountStatus(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

}
