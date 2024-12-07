package com.example.tazkarti.service;

import com.example.tazkarti.dto.GetMatchDto;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.mapper.GetMatchMapper;
import com.example.tazkarti.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
}
