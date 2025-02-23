package com.example.tazkarti.dto;

import lombok.Value;

import java.time.LocalDateTime;
import java.util.List;

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
    private int seatsPerRow;
    private int seatRows;
    private List<Integer> reservedSeats;
}
