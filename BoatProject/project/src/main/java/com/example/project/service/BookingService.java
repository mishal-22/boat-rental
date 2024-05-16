package com.example.project.service;

import java.util.List;

import com.example.project.dto.BookedResponse;
import com.example.project.dto.BookingRequest;
import com.example.project.entity.Booking;

public interface BookingService {

	List<Booking> getAllBooking();

	String deleteBooking(Long id);

	String addBooking(BookingRequest bookingRequest);

	List<BookedResponse> getAllBookedBoatsById(String username);

	List<BookedResponse> getAllBookedBoatsForAdmin(String username);

}
