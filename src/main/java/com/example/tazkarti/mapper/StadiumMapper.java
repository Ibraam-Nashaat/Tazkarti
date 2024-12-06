package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.StadiumDto;
import com.example.tazkarti.entity.Stadium;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface StadiumMapper {
    Stadium DtoToEntity(StadiumDto stadiumDto);

    StadiumDto EntityToDto(Stadium stadium);
}
