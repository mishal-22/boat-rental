package com.example.project.service;

import java.util.List;

import com.example.project.entity.Booking;

public interface BookingService {

	

	List<Booking> getAllBooking();

	String deleteBooking(Long id);

	String addBooking(Long boatId, String name, String email, String phone, String date, String startTime,
			String endTime);

}
