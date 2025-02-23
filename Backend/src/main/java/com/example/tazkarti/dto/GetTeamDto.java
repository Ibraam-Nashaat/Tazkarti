package com.example.tazkarti.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class GetTeamDto {
    private long id;
    private String name;
}
