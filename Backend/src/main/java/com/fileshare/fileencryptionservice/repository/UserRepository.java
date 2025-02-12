package com.fileshare.fileencryptionservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fileshare.fileencryptionservice.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUsername(String username);
    Users findByEmail(String email);
}
