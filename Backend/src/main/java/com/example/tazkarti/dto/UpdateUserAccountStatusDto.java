package com.example.tazkarti.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value

public class UpdateUserAccountStatusDto {
    private boolean activateUserAccount;
}
