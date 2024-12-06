package com.example.tazkarti.repository;

import com.example.tazkarti.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser,Long> {
    public Optional<AppUser> findByEmail(String email);
    public boolean existsByEmail(String email);
    public boolean existsByUsername(String username);

}
