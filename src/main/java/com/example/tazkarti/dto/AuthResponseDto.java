package com.example.tazkarti.dto;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthResponseDto {
    public String jwt;
    public Long userId;
    public String role;
}
