package com.example.tazkarti.entity;

import com.example.tazkarti.enums.UserRole;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
public class AppUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private String firstName;

    private String lastName;

    private String gender;

    private String city;

    private String address;

    private LocalDate birthDate;

    @Enumerated(EnumType.STRING)
    private UserRole role;

    private boolean isApproved = false;
}
