package com.example.tazkarti.controller;

import com.example.tazkarti.dto.*;
import com.example.tazkarti.service.FanService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/fans"})
public class FanController {
    @Autowired
    private FanService fanService;

    @PutMapping({"/{fanId}"})
    public ResponseEntity<GeneralResponseDto> editProfileData(HttpServletRequest request, @Valid @RequestBody EditUserProfileDto editUserProfileDto){
        Long fanId = (Long)request.getAttribute("userId");
        fanService.editProfileData(fanId,editUserProfileDto);
        return ResponseEntity.ok(new GeneralResponseDto("User profile data updated successfully"));
    }
    @GetMapping({"/{fanId}"})
    public ResponseEntity<GetUserDto> getProfileData(HttpServletRequest request){
        Long fanId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(fanService.getUserById(fanId));
    }

    @PostMapping({"/{fanId}/reserveSeat"})
    public ResponseEntity<TicketDto> reserveSeat(HttpServletRequest request, @Valid @RequestBody SeatReservationDto seatReservationDto){
        Long fanId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(fanService.reserveSeat(fanId,seatReservationDto));
    }

    @DeleteMapping({"/{fanId}/tickets/{ticketId}"})
    public ResponseEntity<GeneralResponseDto> cancelSeatReservation(HttpServletRequest request,@PathVariable Long ticketId){
        Long fanId = (Long)request.getAttribute("userId");
        fanService.cancelSeatReservation(fanId,ticketId);
        return ResponseEntity.ok(new GeneralResponseDto("Reservation cancelled successfully"));
    }

    @GetMapping({"/{fanId}/tickets"})
    public ResponseEntity<List<TicketDto>> getAllTickets(HttpServletRequest request){
        Long fanId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(fanService.getAllTickets(fanId));
    }

    @GetMapping({"/{fanId}/tickets/{ticketId}"})
    public ResponseEntity<TicketDto> getTicketById(HttpServletRequest request,@PathVariable Long ticketId){
        Long fanId = (Long)request.getAttribute("userId");
        return ResponseEntity.ok(fanService.getTicketById(fanId,ticketId));
    }
}
