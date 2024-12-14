package com.example.tazkarti.service;

import com.example.tazkarti.dto.*;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.entity.Stadium;
import com.example.tazkarti.entity.Team;
import com.example.tazkarti.enums.AccountStatus;
import com.example.tazkarti.enums.UserRole;
import com.example.tazkarti.mapper.*;
import com.example.tazkarti.repository.AppUserRepository;
import com.example.tazkarti.repository.MatchRepository;
import com.example.tazkarti.repository.StadiumRepository;
import com.example.tazkarti.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    @Autowired
    private GetTeamMapper getTeamMapper;
    @Autowired
    private GetStadiumMapper getStadiumMapper;
    public List<GetTeamDto> getAllTeams(Long managerId){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        if(!Objects.equals(user.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Manager is not active yet");
        }
        List<Team> teams = teamRepository.findAll();
        List<GetTeamDto> getTeamDtos = new ArrayList<>();
        for(Team team:teams){
            getTeamDtos.add(getTeamMapper.EntityToDto(team));
        }
        return getTeamDtos;
    }

   public List<GetStadiumDto> getStadiums(Long managerId){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        if(!Objects.equals(user.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Manager is not active yet");
        }
        List<Stadium> stadiums = stadiumRepository.findAll();
        List<GetStadiumDto> getStadiumDtos = new ArrayList<>();
        for(Stadium stadium:stadiums){
            getStadiumDtos.add(getStadiumMapper.EntityToDto(stadium));
        }
        return getStadiumDtos;
    }

    public void addStadium(Long managerId, StadiumDto stadiumDto){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        if(!Objects.equals(user.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Manager is not active yet");
        }
        stadiumRepository.save(stadiumMapper.DtoToEntity(stadiumDto));

    }
    public void addMatchDetails(Long managerId,MatchDto matchDto){
       validateMatchDetails(managerId,matchDto);
       matchRepository.save(matchMapper.matchDtoToMatch(matchDto));
    }

    public void editMatchDetails(Long managerId,Long matchId,MatchDto matchDto){
        validateMatchDetails(managerId,matchDto);
        Optional<Match> match = matchRepository.findById(matchId);
        if(match.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Match id not found");
        }
        Match updatedMatchDetails= matchMapper.matchDtoToMatch(matchDto);
        updatedMatchDetails.setId(matchId);
        matchRepository.save(updatedMatchDetails);
    }

    private void validateMatchDetails(Long managerId,MatchDto matchDto){
        Optional<AppUser> user = appUserRepository.findById(managerId);
        if(user.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Manager id not found");
        }
        if(user.get().getRole() != UserRole.MANAGER){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized");
        }
        if(!Objects.equals(user.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Manager is not active yet");
        }
        Optional<Team> homeTeam = teamRepository.findById(matchDto.getHomeTeamId());
        if(homeTeam.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Home team not found");
        }
        if(Objects.equals(matchDto.getAwayTeamId(), matchDto.getHomeTeamId())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Home team id can't be equal away team id");
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
