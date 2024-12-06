package com.example.tazkarti.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Value;

@Value
public class LoginRequestDto {
    @NotBlank(message = "email can't be empty")
    @Email()
    public String email;

    @NotBlank(message = "password can't be empty")
    public String password;
}
