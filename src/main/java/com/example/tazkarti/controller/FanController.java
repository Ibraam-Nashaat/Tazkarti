package com.example.tazkarti.controller;

import com.example.tazkarti.dto.EditUserProfileDto;
import com.example.tazkarti.dto.SeatReservationDto;
import com.example.tazkarti.dto.TicketDto;
import com.example.tazkarti.service.FanService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping({"/fans"})
public class FanController {
    @Autowired
    private FanService fanService;

    @PutMapping({"/{fanId}"})
    public ResponseEntity<String> editProfileData(HttpServletRequest request, @Valid @RequestBody EditUserProfileDto editUserProfileDto){
        Long fanId = (Long)request.getAttribute("userId");
        fanService.editProfileData(fanId,editUserProfileDto);
        return ResponseEntity.ok("User profile data updated successfully");
    }

    @PostMapping({"/{fanId}/reserveSeat"})
    public ResponseEntity<TicketDto> reserveSeat(HttpServletRequest request, @Valid @RequestBody SeatReservationDto seatReservationDto){
        Long fanId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(fanService.reserveSeat(fanId,seatReservationDto));
    }

}
