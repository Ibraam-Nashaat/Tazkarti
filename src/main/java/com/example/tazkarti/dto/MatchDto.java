package com.example.tazkarti.dto;

import com.example.tazkarti.entity.Team;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

import java.time.LocalDateTime;

@Value
public class MatchDto {
    @NotNull(message = "date time can't be empty")
    private LocalDateTime dateTime;

    @NotBlank(message = "Main referee can't be empty")
    private String mainReferee;

    @NotBlank(message = "firstlines man can't be empty")
    private String firstLinesman;

    @NotBlank(message = "secondlines man can't be empty")
    private String secondLinesman;

    @NotNull(message = "ticket price can't be empty")
    private int ticketPrice;

    @NotNull(message = "stadium id can't be empty")
    private Long stadiumId;

    @NotNull(message = "home team id can't be empty")
    private Long homeTeamId;

    @NotNull(message = "away team id can't be empty")
    private Long awayTeamId;
}
