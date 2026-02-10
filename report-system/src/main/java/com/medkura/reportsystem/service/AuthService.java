package com.medkura.reportsystem.service;

import org.springframework.stereotype.Service;

import com.medkura.reportsystem.dto.LoginRequest;
import com.medkura.reportsystem.dto.LoginResponse;
import com.medkura.reportsystem.entity.User;
import com.medkura.reportsystem.repository.UserRepository;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        return new LoginResponse(user.getId(), "Login successful");
    }
}
