package com.example.tazkarti.controller;

import com.example.tazkarti.dto.*;
import com.example.tazkarti.service.ManagerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/managers"})
public class ManagerController {
    @Autowired
    private ManagerService managerService;

    @PostMapping({"/{managerId}/stadiums"})
    public ResponseEntity<GeneralResponseDto> addStadium(HttpServletRequest request, @Valid @RequestBody StadiumDto stadiumDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.addStadium(managerId,stadiumDto);
        return ResponseEntity.ok(new GeneralResponseDto("Stadium added successfully"));
    }

    @PostMapping({"/{managerId}/matches"})
    public ResponseEntity<GeneralResponseDto> addMatch(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.addMatchDetails(managerId,matchDto);
        return ResponseEntity.ok(new GeneralResponseDto("Match added successfully"));
    }

    @PutMapping({"/{managerId}/matches/{matchId}"})
    public ResponseEntity<GeneralResponseDto> editMatchDetails(@PathVariable Long matchId, HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.editMatchDetails(managerId,matchId,matchDto);
        return ResponseEntity.ok(new GeneralResponseDto("Match updated successfully"));
    }

    @GetMapping({"/{managerId}/teams"})
    public ResponseEntity<List<GetTeamDto>> getAllTeams(HttpServletRequest request){
        Long managerId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(managerService.getAllTeams(managerId));
    }

    @GetMapping({"/{managerId}/stadiums"})
    public ResponseEntity<List<GetStadiumDto>> getAllStadiums(HttpServletRequest request){
        Long managerId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(managerService.getStadiums(managerId));
    }
}
