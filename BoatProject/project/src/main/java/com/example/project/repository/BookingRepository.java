package com.example.project.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.project.dto.BookedResponse;
import com.example.project.entity.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

	@Query("SELECT NEW com.example.project.dto.BookedResponse(b.id,b.boat.boatName, b.boat.ownerName, b.boat.capacity, b.boat.price, "
			+ "b.boat.description, b.boat.image, b.boat.isActive, b.name, b.email, b.phone, b.date, b.startTime, b.endTime) "
			+ "FROM Booking b WHERE b.user.id = :userId")
	List<BookedResponse> findBookingsByUserId(Long userId);

	@Query("SELECT NEW com.example.project.dto.BookedResponse(b.id,b.boat.boatName, b.boat.ownerName, b.boat.capacity, b.boat.price, "
			+ "b.boat.description, b.boat.image, b.boat.isActive, b.name, b.email, b.phone, b.date, b.startTime, b.endTime) "
			+ "FROM Booking b WHERE b.boat.user.id = :id")
	List<BookedResponse> findBookingsByUserIdForAdmin(Long id);
}
