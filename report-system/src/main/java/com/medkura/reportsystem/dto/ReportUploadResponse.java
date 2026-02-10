package com.medkura.reportsystem.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ReportUploadResponse {
    private Long reportId;
    private String message;

}
