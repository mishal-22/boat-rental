package com.example.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.project.entity.Users;
import com.example.project.service.UserService;
import com.example.project.session.UserSession;

import jakarta.servlet.http.HttpSession;


@RestController
@CrossOrigin
@RequestMapping("boat-life")
public class UsersController {
	@Autowired
	UserService userService;
	
	

	@PostMapping("register")
	public String addUser(@RequestBody Users users) {
		boolean userStatus=userService.emailExist(users.getEmail());
		if(!userStatus) {
			userService.addUser(users);
			return "User added successfully";
		}
		else {
			return "User already Exist";
		}
	}
	@PostMapping("login")
	public String validateUser(@RequestParam String email,@RequestParam String password) {
		boolean loginStatus=userService.validateUser(email,password);
		if(loginStatus) {
			String userRole=userService.userRole(email);
			if(userRole.equals("admin")) {
				return "admin";
			}
			else {
				return "user";
			}
		}
		else {
			return "login failed";
		}
	}
	
}








