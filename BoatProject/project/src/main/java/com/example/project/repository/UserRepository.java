package com.example.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.project.entity.Users;

@Repository
public interface UserRepository extends JpaRepository<Users, Long> {
	public Users findByEmail(String email);
}
