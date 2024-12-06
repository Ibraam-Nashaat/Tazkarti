package com.example.tazkarti.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Team{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "homeTeam")
    private List<Match> homeMatches;

    @OneToMany(mappedBy = "awayTeam")
    private List<Match> awayMatches; 
}
