package com.fileshare.fileencryptionservice.controller;

import com.fileshare.fileencryptionservice.entity.Users; 
import com.fileshare.fileencryptionservice.model.LoginRequest;
import com.fileshare.fileencryptionservice.repository.UserRepository;
import com.fileshare.fileencryptionservice.service.UserService;
import com.fileshare.fileencryptionservice.util.JwtUtil;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {
    @Autowired
    private UserService userService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody Users user) {
        userService.saveUser(user);
        return ResponseEntity.ok("User created successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest, HttpSession session) {
        Users user = userService.findByUsername(loginRequest.getUsername());
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // Set session attribute
        session.setAttribute("user", user);

        return ResponseEntity.ok("Login successful");

    }
    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("Logged out successfully");
    }
    @GetMapping("/search")
    public ResponseEntity<Users> findByUsername(@RequestParam String username) {
        Users user = userService.findByUsername(username);
        if (user == null) {

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(user);
    }

}
