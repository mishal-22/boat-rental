package com.example.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.dto.BookedResponse;
import com.example.project.dto.BookingRequest;
import com.example.project.entity.Boat;
import com.example.project.entity.Booking;
import com.example.project.entity.Users;
import com.example.project.repository.BoatRepository;
import com.example.project.repository.BookingRepository;
import com.example.project.repository.UserRepository;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	BookingRepository bookingRepository;
	@Autowired
	BoatRepository boatRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public String addBooking(BookingRequest bookingRequest) {
		Boat boat = boatRepository.findById(bookingRequest.getBoatId()).get();
		Users users = userRepository.findByEmail(bookingRequest.getUsername());
		if (boat == null) {
			return "Boat not found";
		}
		boat.setBooked(true);
		boatRepository.save(boat);
		Booking booking = new Booking();
		booking.setName(users.getUsername());
		booking.setEmail(users.getEmail());
		booking.setPhone(bookingRequest.getPhone());
		booking.setDate(bookingRequest.getDate());
		booking.setStartTime(bookingRequest.getStartTime());
		booking.setEndTime(bookingRequest.getEndTime());
		booking.setBoat(boat);
		booking.setUser(users);
		bookingRepository.save(booking);
		return "Boat successfully booked";
	}

	@Override
	public List<Booking> getAllBooking() {

		return bookingRepository.findAll();
	}

	@Override
	public String deleteBooking(Long id) {
		Booking booking = bookingRepository.findById(id).get();
		Boat boat = boatRepository.findById(booking.getBoat().getId()).get();
		boat.setBooked(false);
		boatRepository.save(boat);
		bookingRepository.deleteById(id);
		return "Booking Cancelled";
	}

	@Override
	public List<BookedResponse> getAllBookedBoatsById(String username) {
		Users user = userRepository.findByEmail(username);
		return bookingRepository.findBookingsByUserId(user.getId());
	}

	@Override
	public List<BookedResponse> getAllBookedBoatsForAdmin(String username) {
		Users user = userRepository.findByEmail(username);
		return bookingRepository.findBookingsByUserIdForAdmin(user.getId());

	}

}
