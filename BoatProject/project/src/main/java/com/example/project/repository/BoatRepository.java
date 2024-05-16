package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.project.entity.Boat;

@Repository
public interface BoatRepository extends JpaRepository<Boat, Long> {

	List<Boat> findAllByUserId(Long UserId);

	@Query("SELECT b FROM Boat b WHERE b.isBooked = false")
	List<Boat> findAll();

}
