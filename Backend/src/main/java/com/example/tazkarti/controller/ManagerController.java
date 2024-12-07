package com.example.tazkarti.controller;

import com.example.tazkarti.dto.MatchDto;
import com.example.tazkarti.dto.StadiumDto;
import com.example.tazkarti.dto.TeamDto;
import com.example.tazkarti.service.ManagerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/managers"})
public class ManagerController {
    @Autowired
    private ManagerService managerService;

    @PostMapping({"/{managerId}/stadiums"})
    public ResponseEntity<String> addStadium(HttpServletRequest request, @Valid @RequestBody StadiumDto stadiumDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.addStadium(managerId,stadiumDto);
        return ResponseEntity.ok("Stadium added successfully");
    }

    @PostMapping({"/{managerId}/matches"})
    public ResponseEntity<String> addMatch(HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.addMatchDetails(managerId,matchDto);
        return ResponseEntity.ok("Match added successfully");
    }

    @PutMapping({"/{managerId}/matches/{matchId}"})
    public ResponseEntity<String> editMatchDetails(@PathVariable Long matchId, HttpServletRequest request, @Valid @RequestBody MatchDto matchDto){
        Long managerId = (Long)request.getAttribute("userId");
        managerService.editMatchDetails(managerId,matchId,matchDto);
        return ResponseEntity.ok("Match updated successfully");
    }
}
