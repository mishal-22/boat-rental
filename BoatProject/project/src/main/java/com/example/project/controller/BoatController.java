package com.example.project.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.project.entity.Boat;
import com.example.project.service.BoatService;
import com.example.project.session.UserSession;

import jakarta.servlet.http.HttpSession;

@RestController
@CrossOrigin
@RequestMapping("/boat")
public class BoatController {
	
	@Autowired
	BoatService boatService;
	
	@Autowired
	UserSession userSession;

	@PostMapping()
	public String addBoat(@RequestParam("photo") MultipartFile file,
            @RequestParam("boatName") String boatName,
            @RequestParam("ownerName") String ownerName,
            @RequestParam("capacity") int capacity,
            @RequestParam("price")int price,
            @RequestParam("description") String description,
            @RequestParam("isActive") boolean isActive,
            @RequestParam("username") String username) throws IOException {
		
	
		return boatService.addboat(username,boatName,ownerName,capacity,price,description,file,isActive);
	}
	
	@GetMapping()
	public List<Boat> getAllBoats(@RequestParam("username") String username){
		return boatService.getAllBoats(username);
	}
	@GetMapping("/{id}")
	public Boat getBoatByid(@PathVariable Long id) {
		return boatService.getBoatById(id);
	}
	@DeleteMapping("{id}")
	public String deleteBoat(@PathVariable Long id) {
		return boatService.deleteBoat(id);
	}
	@GetMapping("/active/{id}")
	public String setActive(@PathVariable Long id) {
		return boatService.setActive(id);
	}
}
