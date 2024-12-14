package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.GetStadiumDto;
import com.example.tazkarti.entity.Stadium;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface GetStadiumMapper {
    Stadium DtoToEntity(GetStadiumDto stadiumDto);

    GetStadiumDto EntityToDto(Stadium stadium);
}
