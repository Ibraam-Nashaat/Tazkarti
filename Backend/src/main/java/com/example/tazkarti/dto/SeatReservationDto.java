package com.example.tazkarti.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Value;

@Value
public class SeatReservationDto {
    @NotNull(message = "match id must be provided")
    private Long matchId;

    @Min(value = 1, message = "seat number must be provided")
    private int seatNumber;

    @NotNull(message = "credit card number must be provided")
    private Long creditCardNumber;

    @NotNull(message = "pin number must be provided")
    private Long pinNumber;
}
