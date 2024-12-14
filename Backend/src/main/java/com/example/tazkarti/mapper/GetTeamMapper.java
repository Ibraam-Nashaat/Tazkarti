package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.GetTeamDto;
import com.example.tazkarti.entity.Team;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface GetTeamMapper {
    Team DtoToEntity(GetTeamDto teamDto);

    GetTeamDto EntityToDto(Team team);
}
