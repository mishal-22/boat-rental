package com.example.project.service;

import com.example.project.entity.Users;

public interface UserService {

	boolean emailExist(String email);

	void addUser(Users users);

	boolean validateUser(String email, String password);

	String userRole(String email);

}
