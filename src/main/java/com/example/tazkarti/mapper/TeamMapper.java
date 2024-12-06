package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.TeamDto;
import com.example.tazkarti.entity.Team;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TeamMapper {
    Team DtoToEntity(TeamDto teamDto);

    TeamDto EntityToDto(Team team);
}
