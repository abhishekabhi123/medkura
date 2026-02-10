package com.medkura.reportsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor

public class LoginResponse {
    private Long userId;
    private String message;
}
