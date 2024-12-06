package com.example.tazkarti.service;
import com.example.tazkarti.dto.LoginRequestDto;
import com.example.tazkarti.dto.AuthResponseDto;
import com.example.tazkarti.dto.UserDto;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.enums.UserRole;
import com.example.tazkarti.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class AuthService {
    @Autowired
    private JWTService jwtService;

    @Autowired
    private AppUserRepository appUserRepository;
    BCryptPasswordEncoder passwordEncoder;
    public AuthService(){
        passwordEncoder= new BCryptPasswordEncoder();
    }

    public AuthResponseDto login(LoginRequestDto loginRequestDto){
        Optional<AppUser> appUser= appUserRepository.findByEmail(loginRequestDto.email);
        if(appUser.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Email not found");
        }
        if(!this.passwordEncoder.matches(loginRequestDto.password,appUser.get().getPassword())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Wrong Password");
        }
        String role= appUser.get().getRole().getDisplayName();
        return new AuthResponseDto(jwtService.generateJwt(appUser.get().getId(),role),appUser.get().getId(),role);
    }

    public AuthResponseDto signup(UserDto userDto){
        if (appUserRepository.existsByEmail(userDto.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Email already exists"
            );
        }

        if (appUserRepository.existsByUsername(userDto.getUsername())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Username already exists"
            );
        }
        UserRole role = UserRole.fromString(userDto.getRole());

        AppUser appUser = new AppUser();
        appUser.setEmail(userDto.getEmail());
        appUser.setUsername(userDto.getUsername());
        appUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        appUser.setFirstName(userDto.getFirstName());
        appUser.setLastName(userDto.getLastName());
        appUser.setGender(userDto.getGender());
        appUser.setCity(userDto.getCity());
        appUser.setAddress(userDto.getAddress());
        appUser.setBirthDate(userDto.getBirthDate());
        appUser.setRole(role); // Set the role as the UserRole enum

        appUser = appUserRepository.save(appUser);

        // Return the LoginResponseDto
        return new AuthResponseDto(jwtService.generateJwt(appUser.getId(),role.getDisplayName()),appUser.getId(),role.getDisplayName());
    }
}
