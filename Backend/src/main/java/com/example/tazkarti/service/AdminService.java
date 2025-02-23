package com.example.tazkarti.service;

import com.example.tazkarti.dto.GetUserDto;
import com.example.tazkarti.dto.TeamDto;
import com.example.tazkarti.dto.UpdateUserAccountStatusDto;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.enums.AccountStatus;
import com.example.tazkarti.enums.UserRole;
import com.example.tazkarti.mapper.GetUserMapper;
import com.example.tazkarti.mapper.TeamMapper;
import com.example.tazkarti.repository.AppUserRepository;
import com.example.tazkarti.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service

public class AdminService {
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private TeamMapper teamMapper;

    @Autowired
    private GetUserMapper getUserMapper;
    public void addTeam(Long adminId, TeamDto teamDto){
        Optional<AppUser> admin = appUserRepository.findById(adminId);
        if(admin.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"admin id not found");
        }
        if(admin.get().getRole() != UserRole.ADMIN){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        teamRepository.save(teamMapper.DtoToEntity(teamDto));
    }

    public void updateAccountStatus(Long adminId,UpdateUserAccountStatusDto updateUserAccountStatusDto,Long userId){
        Optional<AppUser> admin = appUserRepository.findById(adminId);
        if(admin.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"admin id not found");
        }
        if(admin.get().getRole() != UserRole.ADMIN){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        Optional <AppUser> user = appUserRepository.findById(userId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"user id not found");
        }
        if(updateUserAccountStatusDto.isActivateUserAccount()){
            user.get().setStatus(AccountStatus.ACTIVE.getDisplayName());
        }
        else user.get().setStatus(AccountStatus.NOT_ACTIVE.getDisplayName());

        appUserRepository.save(user.get());
    }

    public void removeUser(Long adminId,Long userId){
        Optional<AppUser> admin = appUserRepository.findById(adminId);
        if(admin.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"admin id not found");
        }
        if(admin.get().getRole() != UserRole.ADMIN){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        Optional <AppUser> user = appUserRepository.findById(userId);
        if(user.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "user id not found");
        }
        appUserRepository.delete(user.get());
    }

    public List<GetUserDto> getAllUsers(Long adminId){
        Optional<AppUser> admin = appUserRepository.findById(adminId);
        if(admin.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"admin id not found");
        }
        List<AppUser> allUsers= appUserRepository.findAll();
        List<GetUserDto> getUserDtos = new ArrayList<>();
        for(AppUser user: allUsers){
            if(user.getRole() != UserRole.ADMIN){
                getUserDtos.add(getUserMapper.toDto(user));
            }
        }
        return getUserDtos;
    }

    public GetUserDto getUserById(Long adminId, Long userId){
        Optional<AppUser> admin = appUserRepository.findById(adminId);
        if(admin.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"admin id not found");
        }
        Optional<AppUser> user = appUserRepository.findById(userId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"user id not found");
        }
        return getUserMapper.toDto(user.get());
    }
}
