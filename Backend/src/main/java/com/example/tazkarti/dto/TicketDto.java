package com.example.tazkarti.dto;

import lombok.Value;

import java.time.LocalDateTime;
@Value
public class TicketDto {
    private Long ticketId;
    private String homeTeamName;
    private String awayTeamName;
    private String stadiumName;
    private int seatNumber;
    private int ticketPrice;
    private LocalDateTime matchDateTime;
    private LocalDateTime reservationDateTime;

}
