package com.example.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.dto.BookedResponse;
import com.example.project.dto.BookingRequest;
import com.example.project.entity.Booking;
import com.example.project.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping("booking")
public class BookingController {

	@Autowired
	BookingService bookingService;

	@PostMapping()
	public String addBooking(@RequestBody BookingRequest bookingRequest) {
		return bookingService.addBooking(bookingRequest);
	}

	@GetMapping()
	public List<Booking> getAllBookings() {
		return bookingService.getAllBooking();
	}

	@DeleteMapping("{id}")
	public String deleteBooking(@PathVariable Long id) {
		return bookingService.deleteBooking(id);
	}

	@GetMapping("/view")
	public List<BookedResponse> getAllBookedBoatsById(@RequestParam("username") String username) {
		return bookingService.getAllBookedBoatsById(username);
	}

	@GetMapping("/admin-view")
	public List<BookedResponse> getAllBookedBoatsForAdmin(@RequestParam("username") String username) {
		return bookingService.getAllBookedBoatsForAdmin(username);
	}
}