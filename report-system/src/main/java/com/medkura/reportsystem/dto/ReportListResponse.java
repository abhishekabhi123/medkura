package com.medkura.reportsystem.dto;

import com.medkura.reportsystem.entity.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor

public class ReportListResponse {

    private Long id;
    private String name;
    private String type;
    private ReportStatus status;
    private LocalDateTime createdAt;
}
