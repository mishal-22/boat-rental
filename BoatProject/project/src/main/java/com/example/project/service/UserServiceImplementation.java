package com.example.project.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.project.entity.Users;
import com.example.project.repository.UserRepository;



@Service
public class UserServiceImplementation implements UserService {

	@Autowired
	UserRepository userRepository;

//	@Override
	public boolean emailExist(String email) {
		if (userRepository.findByEmail(email) == null) {
			return false;
		} else {
			return true;
		}

	}

	@Override
	public void addUser(Users users) {
		userRepository.save(users);
		
	}

	@Override
	public boolean validateUser(String email, String password) {
	   Users user=userRepository.findByEmail(email);
	   String db_password=user.getPassword();
	   if(db_password.equals(password)) {
		   return true;
	   }else {
		   
		return false;
	   }
	}

	@Override
	public String userRole(String email) {
		Users user=userRepository.findByEmail(email);
		return user.getRole();
		
	}

}
