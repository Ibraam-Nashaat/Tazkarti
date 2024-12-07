package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.GetMatchDto;
import com.example.tazkarti.entity.Match;
import org.mapstruct.*;

@Mapper(componentModel = "spring")
public interface GetMatchMapper {

    @Mapping(source = "id", target = "matchId")
    @Mapping(source = "homeTeam.name", target = "homeTeamName")
    @Mapping(source = "awayTeam.name", target = "awayTeamName")
    @Mapping(source = "stadium.name", target = "stadiumName")
    GetMatchDto toDto(Match match);

    @Mapping(source = "matchId", target = "id")
    @Mapping(target = "homeTeam.name", source = "homeTeamName")
    @Mapping(target = "awayTeam.name", source = "awayTeamName")
    @Mapping(target = "stadium.name", source = "stadiumName")
    Match toEntity(GetMatchDto dto);
}
