package com.example.tazkarti.mapper;
import com.example.tazkarti.dto.UserDto;
import com.example.tazkarti.entity.AppUser;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface UserMapper {
    UserDto toDTO(AppUser appUser);
    AppUser toEntity(UserDto userDto);
}
