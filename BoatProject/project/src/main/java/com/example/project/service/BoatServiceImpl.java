package com.example.project.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.entity.Boat;
import com.example.project.entity.Users;
import com.example.project.repository.BoatRepository;
import com.example.project.repository.UserRepository;

@Service
public class BoatServiceImpl implements BoatService {

	@Autowired
	BoatRepository boatRepository;
	@Autowired
	UserRepository userRepository;

	@Override
	public String addboat(String username, String boatName, int capacity, int price, String description,
			MultipartFile image, boolean isActive) throws IOException {

		Users user = userRepository.findByEmail(username);
		String folderPath = "C:\\Users\\91702\\OneDrive\\Desktop\\boat\\vite-react\\public\\";
		String fileName = image.getOriginalFilename();
		Path filePath = Paths.get(folderPath + fileName);
		Files.write(filePath, image.getBytes());
		Boat boatRequest = new Boat();
		boatRequest.setBoatName(boatName);
		boatRequest.setOwnerName(user.getUsername());
		boatRequest.setCapacity(capacity);
		boatRequest.setDescription(description);
		boatRequest.setImage(fileName);
		boatRequest.setPrice(price);
		boatRequest.setActive(isActive);
		boatRequest.setBooked(false);
		boatRequest.setUser(user);
		boatRepository.save(boatRequest);
		return "boat added successfully";
	}

	@Override
	public List<Boat> getAllBoats(String username) {
		Users users = userRepository.findByEmail(username);
		return boatRepository.findAllByUserId(users.getId());
	}

	@Override
	public Boat getBoatById(Long id) {

		return boatRepository.findById(id).get();
	}

	@Override
	public String deleteBoat(Long id) {
		if (getBoatById(id) == null) {
			return "Boat does not exist with this id";
		} else {
			boatRepository.deleteById(id);
			return "Boat successfully deleted";
		}
	}

	@Override
	public String setActive(Long id) {
		Boat boat = boatRepository.findById(id).orElse(null);
		if (boat == null) {
			return "Boat not found";
		}
		if (boat.isBooked()) {
			return "Boat is booked, so can't activate";
		} else {
			if (boat.isActive()) {
				boat.setActive(false);
			} else {
				boat.setActive(true);
			}
			boatRepository.save(boat);
			return "Boat added successfully";
		}
	}

	@Override
	public List<Boat> getAllBoatsForUsers() {

		return boatRepository.findAll();
	}

}
