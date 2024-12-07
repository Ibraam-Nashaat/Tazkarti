package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.TicketDto;
import com.example.tazkarti.entity.Ticket;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface TicketMapper {

    @Mapping(source = "id", target = "ticketId")
    @Mapping(source = "match.homeTeam.name", target = "homeTeamName")
    @Mapping(source = "match.awayTeam.name", target = "awayTeamName")
    @Mapping(source = "match.stadium.name", target = "stadiumName")
    @Mapping(source = "match.dateTime", target = "matchDateTime")
    @Mapping(source = "match.ticketPrice", target = "ticketPrice")
    TicketDto toDto(Ticket ticket);
}
