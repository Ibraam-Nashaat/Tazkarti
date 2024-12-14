package com.example.tazkarti.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.time.LocalDate;

@Value
public class EditUserProfileDto {

    @NotBlank(message = "password can't be empty")
    private String password;

    @NotBlank(message = "first name can't be empty")
    private String firstName;

    @NotBlank(message = "last name can't be empty")
    private String lastName;

    @NotBlank(message = "gender can't be empty")
    private String gender;

    @NotBlank(message = "city can't be empty")
    private String city;

    private String address;

    @NotNull(message = "birth date can't be empty")
    private LocalDate birthDate;

}
