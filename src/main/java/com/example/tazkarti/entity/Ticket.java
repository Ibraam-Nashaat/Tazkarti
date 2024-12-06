package com.example.tazkarti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int seatNumber;
    @ManyToOne
    @JoinColumn(name = "userId")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "matchId")
    private Match match;
}
