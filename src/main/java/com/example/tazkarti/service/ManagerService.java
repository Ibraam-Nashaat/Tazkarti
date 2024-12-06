package com.example.tazkarti.service;

import com.example.tazkarti.dto.MatchDto;
import com.example.tazkarti.dto.StadiumDto;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.entity.Stadium;
import com.example.tazkarti.entity.Team;
import com.example.tazkarti.enums.AccountStatus;
import com.example.tazkarti.enums.UserRole;
import com.example.tazkarti.mapper.MatchMapper;
import com.example.tazkarti.mapper.StadiumMapper;
import com.example.tazkarti.repository.AppUserRepository;
import com.example.tazkarti.repository.MatchRepository;
import com.example.tazkarti.repository.StadiumRepository;
import com.example.tazkarti.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Service
public class ManagerService {
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private TeamRepository teamRepository;

    @Autowired
    private StadiumRepository stadiumRepository;

    @Autowired
    private MatchMapper matchMapper;
    @Autowired
    private StadiumMapper stadiumMapper;
    public void addStadium(Long managerId, StadiumDto stadiumDto){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        stadiumRepository.save(stadiumMapper.DtoToEntity(stadiumDto));

    }
    public void addMatchDetails(Long managerId,MatchDto matchDto){
       validateMatchDetails(managerId,matchDto);
       matchRepository.save(matchMapper.matchDtoToMatch(matchDto));
    }
    private void validateMatchDetails(Long managerId,MatchDto matchDto){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        Optional<Team> homeTeam = teamRepository.findById(matchDto.getHomeTeamId());
        if(homeTeam.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Home team not found");
        }
        Optional<Team> awayTeam = teamRepository.findById(matchDto.getAwayTeamId());
        if(awayTeam.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Away team not found");
        }
        Optional<Stadium> stadium =  stadiumRepository.findById(matchDto.getStadiumId());
        if(stadium.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Stadium not found");
        }
    }

}
