package com.example.tazkarti.dto;

import lombok.Value;

import java.time.LocalDateTime;

@Value
public class GetMatchDto {
    private Long matchId;
    private LocalDateTime dateTime;
    private String mainReferee;
    private String firstLinesman;
    private String secondLinesman;
    private int ticketPrice;
    private String homeTeamName;
    private String awayTeamName;
    private String stadiumName;
}
