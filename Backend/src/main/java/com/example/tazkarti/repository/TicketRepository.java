package com.example.tazkarti.repository;

import com.example.tazkarti.entity.AppUser;
import com.example.tazkarti.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TicketRepository extends JpaRepository<Ticket,Long> {
    boolean existsByMatchIdAndSeatNumber(Long matchId, int seatNumber);

}
