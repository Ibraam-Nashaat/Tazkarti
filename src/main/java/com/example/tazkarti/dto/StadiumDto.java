package com.example.tazkarti.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class StadiumDto {
    @NotBlank(message = "name can't be empty")
    private String name;
    @NotBlank(message = "city can't be empty")
    private String city;
    @NotBlank(message = "address can't be empty")
    private String address;
    @Min(value = 1, message = "number of rows must be added and must be at least 1")
    private int rows;
    @Min(value = 1, message = "row seats must be added and must be at least 1")
    private int rowSeats;
}
