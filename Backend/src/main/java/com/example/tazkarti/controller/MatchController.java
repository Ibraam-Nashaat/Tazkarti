package com.example.tazkarti.controller;

import com.example.tazkarti.dto.GetMatchDto;
import com.example.tazkarti.dto.MatchDto;
import com.example.tazkarti.service.MatchService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/matches"})
public class MatchController {
    @Autowired
    private MatchService matchService;
    @GetMapping
    public ResponseEntity<List<GetMatchDto>> getMatches(){
        return ResponseEntity.ok(matchService.getAllMatches());
    }
    @GetMapping({"/{matchId}"})
    public ResponseEntity<GetMatchDto> getMatchById(@PathVariable Long matchId){
        return ResponseEntity.ok(matchService.getMatchById(matchId));
    }
}
