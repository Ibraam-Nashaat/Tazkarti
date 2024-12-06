package com.example.tazkarti.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class RemoveUserDto {
    @NotNull(message = "User id is required")
    private Long userId;
}
