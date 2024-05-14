package com.example.project.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.entity.Boat;
import com.example.project.entity.Booking;
import com.example.project.repository.BoatRepository;
import com.example.project.repository.BookingRepository;

@Service
public class BookingServiceImpl implements BookingService {

	@Autowired
	BookingRepository bookingRepository;
	@Autowired
	BoatRepository boatRepository;
	@Override
	public String addBooking(Long boatId, String name, String email, String phone, String date, String startTime,
			String endTime) {
		Boat boat=boatRepository.findById(boatId).get();
		if(boat==null) {
			return "Boat not found";
		}
		boat.setBooked(true);
		boatRepository.save(boat);
		Booking booking=new Booking();
		booking.setName(name);
		booking.setEmail(email);
		booking.setPhone(phone);
		booking.setDate(date);
		booking.setStartTime(startTime);
		booking.setEndTime(endTime);
		booking.setBoat(boat);
		bookingRepository.save(booking);
		return "Boat successfully booked";
	}
	@Override
	public List<Booking> getAllBooking() {
		
		return bookingRepository.findAll();
	}
	@Override
	public String deleteBooking(Long id) {
		Booking booking=bookingRepository.findById(id).get();
		Boat boat=boatRepository.findById(booking.getBoat().getId()).get();
		boat.setBooked(false);
		boatRepository.save(boat);
		bookingRepository.deleteById(id);
		
		return "Booking Cancelled";
	}
	

}
