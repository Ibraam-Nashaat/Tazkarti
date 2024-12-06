package com.example.tazkarti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Match{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDateTime dateTime;

    private String mainReferee;

    private String firstLinesman;

    private String secondLinesman;

    private int ticketPrice;

    @ManyToOne
    @JoinColumn(name = "stadiumId")
    private Stadium stadium;

    @ManyToOne
    @JoinColumn(name = "homeTeamId")
    private Team homeTeam;

    @ManyToOne
    @JoinColumn(name = "awayTeamId")
    private Team awayTeam;
}
