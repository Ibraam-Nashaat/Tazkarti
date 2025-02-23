package com.example.tazkarti.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class GetStadiumDto {
    private Long id;
    private String name;
}
