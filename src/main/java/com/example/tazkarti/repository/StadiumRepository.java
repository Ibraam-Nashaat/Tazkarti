package com.example.tazkarti.repository;

import com.example.tazkarti.entity.Stadium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StadiumRepository extends JpaRepository<Stadium,Long> {

}
