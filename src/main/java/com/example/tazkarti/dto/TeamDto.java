package com.example.tazkarti.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class TeamDto {
    @NotBlank(message = "Team name can't be empty")
    private String name;
}
