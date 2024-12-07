package com.example.tazkarti.service;

import com.example.tazkarti.dto.GetMatchDto;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.mapper.GetMatchMapper;
import com.example.tazkarti.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class MatchService {
    @Autowired
    private MatchRepository matchRepository;

    @Autowired
    private GetMatchMapper getMatchMapper;
    public List<GetMatchDto> getAllMatches(){
        List<Match> matches = matchRepository.findAll();
        List<GetMatchDto> getMatchesDtos = new ArrayList<>();
        for(Match match:matches){
            getMatchesDtos.add(getMatchMapper.toDto(match));
        }
        return getMatchesDtos;
    }

    public GetMatchDto getMatchById(Long matchId){
        Optional<Match> match = matchRepository.findById(matchId);
        if(match.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Match id not found");
        }
        return getMatchMapper.toDto(match.get());
    }
}
