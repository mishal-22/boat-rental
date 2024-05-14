package com.example.project.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.example.project.entity.Boat;

public interface BoatService {

	

	String addboat(String username,String boatName, String ownerName, int capacity,int price, String description,MultipartFile image,boolean isActive) throws IOException;

	List<Boat> getAllBoats(String username);

	Boat getBoatById(Long id);

	String deleteBoat(Long id);

	String setActive(Long id);

}
