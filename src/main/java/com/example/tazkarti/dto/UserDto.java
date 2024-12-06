package com.example.tazkarti.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Value;

import java.time.LocalDate;

@Value
public class UserDto {
    @NotBlank(message = "email can't be empty")
    @Email()
    private String email;

    @NotBlank(message = "password can't be empty")
    private String password;

    @NotBlank(message = "first name can't be empty")
    private String firstName;

    @NotBlank(message = "last name can't be empty")
    private String lastName;

    @NotBlank(message = "username can't be empty")
    private String username;

    @NotBlank(message = "gender can't be empty")
    private String gender;

    @NotBlank(message = "city can't be empty")
    private String city;

    private String address;

    @NotNull(message = "birth date can't be empty")
    private LocalDate birthDate;

    @NotBlank(message = "role can't be empty")
    private String role;
}
