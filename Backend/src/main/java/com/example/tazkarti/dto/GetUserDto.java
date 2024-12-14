package com.example.tazkarti.dto;

import lombok.Value;

import java.time.LocalDate;

@Value
public class GetUserDto {
    private Long userId;

    private String email;

    private String firstName;

    private String lastName;

    private String username;

    private String gender;

    private String city;

    private String address;

    private LocalDate birthDate;

    private String role;

    private String accountStatus;
}
