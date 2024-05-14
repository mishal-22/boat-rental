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

import com.example.project.entity.Booking;
import com.example.project.service.BookingService;

@RestController
@CrossOrigin("*")
@RequestMapping("booking")
public class BookingController {

	@Autowired
	BookingService bookingService;

	@PostMapping()
	public String addBooking(@RequestParam Long boatId, @RequestParam String name, @RequestParam String email,
			@RequestParam String phone,@RequestParam String date,@RequestParam String startTime,@RequestParam String endTime) {
		return bookingService.addBooking(boatId,name,email,phone,date,startTime,endTime);
	}

	@GetMapping()
	public List<Booking> getAllBookings() {
		return bookingService.getAllBooking();
	}

	@DeleteMapping("{id}")
	public String deleteBooking(@PathVariable Long id) {
		return bookingService.deleteBooking(id);
	}

}
