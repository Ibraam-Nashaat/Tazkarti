package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.MatchDto;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.entity.Team;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface MatchMapper {

    MatchMapper INSTANCE = Mappers.getMapper(MatchMapper.class);

    @Mapping(source = "stadiumId", target = "stadium.id")
    @Mapping(source = "homeTeamId", target = "homeTeam.id")
    @Mapping(source = "awayTeamId", target = "awayTeam.id")
    Match matchDtoToMatch(MatchDto matchDto);

    @Mapping(source = "stadium.id", target = "stadiumId")
    @Mapping(source = "homeTeam.id", target = "homeTeamId")
    @Mapping(source = "awayTeam.id", target = "awayTeamId")
    MatchDto matchToMatchDto(Match match);
}
