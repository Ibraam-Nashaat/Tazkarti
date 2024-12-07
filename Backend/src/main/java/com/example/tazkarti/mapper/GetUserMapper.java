package com.example.tazkarti.mapper;

import com.example.tazkarti.dto.GetUserDto;
import com.example.tazkarti.entity.AppUser;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")

public interface GetUserMapper {
    @Mapping(source = "status", target = "accountStatus")
    @Mapping(source = "id", target = "userId")
    GetUserDto toDto(AppUser user);
}
