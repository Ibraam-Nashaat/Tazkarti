package com.example.tazkarti.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int seatNumber;
    private LocalDateTime reservationDateTime;
    @ManyToOne
    @JoinColumn(name = "userId")
    private AppUser user;
    @ManyToOne
    @JoinColumn(name = "matchId")
    private Match match;
}
