package com.example.tazkarti.service;

import com.example.tazkarti.dto.EditUserProfileDto;
import com.example.tazkarti.dto.SeatReservationDto;
import com.example.tazkarti.dto.TicketDto;
import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.entity.CreditCard;
import com.example.tazkarti.entity.Match;
import com.example.tazkarti.entity.Ticket;
import com.example.tazkarti.enums.AccountStatus;
import com.example.tazkarti.mapper.TicketMapper;
import com.example.tazkarti.repository.AppUserRepository;
import com.example.tazkarti.repository.CreditCardRepository;
import com.example.tazkarti.repository.MatchRepository;
import com.example.tazkarti.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class FanService {
    @Autowired
    private AppUserRepository appUserRepository;
    @Autowired
    private MatchRepository matchRepository;
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private CreditCardRepository creditCardRepository;

    @Autowired
    private TicketMapper ticketMapper;
    BCryptPasswordEncoder passwordEncoder;
    public FanService(){
        passwordEncoder= new BCryptPasswordEncoder();
    }
    public List<TicketDto> getAllTickets(Long fanId){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan id not found");
        }
        if(!Objects.equals(fan.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Fan is not active yet");
        }
        List<Ticket> tickets= ticketRepository.findByUserId(fanId);
        List<TicketDto> ticketDtos = new ArrayList<>();
        for(Ticket ticket: tickets){
            ticketDtos.add(ticketMapper.toDto(ticket));
        }
        return ticketDtos;
    }

    public TicketDto getTicketById(Long fanId,Long ticketId){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan id not found");
        }
        if(!Objects.equals(fan.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Fan is not active yet");
        }
        Optional<Ticket> ticket = ticketRepository.findById(ticketId);
        if(ticket.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ticket id not found");
        }
        if(!Objects.equals(ticket.get().getUser().getId(), fanId)){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Unauthorized access");
        }
        return ticketMapper.toDto(ticket.get());
    }
    public void editProfileData(Long fanId,EditUserProfileDto editUserProfileDto){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan not found");
        }
        fan.get().setPassword(passwordEncoder.encode(editUserProfileDto.getPassword()));
        fan.get().setFirstName(editUserProfileDto.getFirstName());
        fan.get().setLastName(editUserProfileDto.getLastName());
        fan.get().setGender(editUserProfileDto.getGender());
        fan.get().setCity(editUserProfileDto.getCity());
        fan.get().setAddress(editUserProfileDto.getAddress());
        fan.get().setBirthDate(editUserProfileDto.getBirthDate());
        appUserRepository.save(fan.get());
    }

    public TicketDto reserveSeat(Long fanId, SeatReservationDto seatReservationDto){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan id not found");
        }
        if(!Objects.equals(fan.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Fan is not active yet");
        }
        Optional<Match> match = matchRepository.findById(seatReservationDto.getMatchId());
        if(match.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Match id not found");
        }
        int seatNumber = seatReservationDto.getSeatNumber();
        int seatRows = match.get().getStadium().getRows();
        int seatsPerRow = match.get().getStadium().getRowSeats();
        if(seatNumber < 1 || seatNumber > (seatRows*seatsPerRow)){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"seat number is out of range");
        }
        boolean isSeatReserved =ticketRepository.existsByMatchIdAndSeatNumber(seatReservationDto.getMatchId(),seatReservationDto.getSeatNumber());
        if(isSeatReserved){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"seat is already reserved");
        }
        CreditCard creditCard = new CreditCard();
        creditCard.setCreditCardNumber(seatReservationDto.getCreditCardNumber());
        creditCard.setPinNumber(seatReservationDto.getPinNumber());
        creditCard.setUser(fan.get());
        creditCardRepository.save(creditCard);

        Ticket ticket = new Ticket();
        ticket.setReservationDateTime(LocalDateTime.now());
        ticket.setSeatNumber(seatNumber);
        ticket.setUser(fan.get());
        ticket.setMatch(match.get());

        ticket = ticketRepository.save(ticket);
        return ticketMapper.toDto(ticket);
    }

    public void cancelSeatReservation(Long fanId, Long ticketId){
        Optional<AppUser> fan = appUserRepository.findById(fanId);
        if(fan.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Fan id not found");
        }
        if(!Objects.equals(fan.get().getStatus(), AccountStatus.ACTIVE.getDisplayName())){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Fan is not active yet");
        }
        Optional<Ticket> ticket = ticketRepository.findById(ticketId);
        if(ticket.isEmpty()){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Ticket not found");
        }
        LocalDateTime matchDateTime = ticket.get().getMatch().getDateTime();
        LocalDateTime now = LocalDateTime.now();

        // Calculate the time difference between the match time and the current time
        Duration duration = Duration.between(now, matchDateTime);
        System.out.println(duration.toDays());
        if(duration.toDays() < 3 || duration.isNegative()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Reservation can't be cancelled");
        }
        ticketRepository.deleteById(ticketId);
    }
}
