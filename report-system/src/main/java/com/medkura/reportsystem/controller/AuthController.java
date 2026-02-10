package com.medkura.reportsystem.controller;

import com.medkura.reportsystem.dto.LoginRequest;
import com.medkura.reportsystem.dto.LoginResponse;
import com.medkura.reportsystem.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return authService.login(request);
    }

}
