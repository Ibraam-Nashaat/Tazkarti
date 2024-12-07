package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.GetMatchDto;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.entity.Ticket;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface GetMatchMapper {

    @Mapping(source = "id", target = "matchId")
    @Mapping(source = "homeTeam.name", target = "homeTeamName")
    @Mapping(source = "awayTeam.name", target = "awayTeamName")
    @Mapping(source = "stadium.name", target = "stadiumName")
    @Mapping(source = "stadium.rows",target="seatRows")
    @Mapping(source = "stadium.rowSeats", target = "seatsPerRow")
    @Mapping(target = "reservedSeats", expression = "java(mapReservedSeats(match.getTickets()))")
    GetMatchDto toDto(Match match);

    default List<Integer> mapReservedSeats(List<Ticket> tickets) {
        // Go through each ticket in the list and get its seat number
        return tickets.stream()               // Convert the list to a stream
                .map(Ticket::getSeatNumber)   // Get seat number of each ticket
                .collect(Collectors.toList()); // Put the seat numbers into a list
    }

}
