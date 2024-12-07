package com.example.tazkarti.service;

import com.example.tazkarti.dto.EditUserProfileDto;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.enums.AccountStatus;
import com.example.tazkarti.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;
import java.util.Optional;

@Service
public class FanService {
    @Autowired
    private AppUserRepository appUserRepository;
    BCryptPasswordEncoder passwordEncoder;
    public FanService(){
        passwordEncoder= new BCryptPasswordEncoder();
    }

    public void editProfileData(Long fanId,EditUserProfileDto editUserProfileDto){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan not found");
        }
        fan.get().setPassword(passwordEncoder.encode(editUserProfileDto.getPassword()));
        fan.get().setFirstName(editUserProfileDto.getFirstName());
        fan.get().setLastName(editUserProfileDto.getLastName());
        fan.get().setGender(editUserProfileDto.getGender());
        fan.get().setCity(editUserProfileDto.getCity());
        fan.get().setAddress(editUserProfileDto.getAddress());
        fan.get().setBirthDate(editUserProfileDto.getBirthDate());
        appUserRepository.save(fan.get());
    }
}
