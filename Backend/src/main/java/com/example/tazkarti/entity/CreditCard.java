package com.example.tazkarti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CreditCard {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long creditCardNumber;
    private Long pinNumber;
    @ManyToOne
    @JoinColumn(name = "userId")
    private AppUser user;
}
