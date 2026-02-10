package com.medkura.reportsystem.dto;

import com.medkura.reportsystem.entity.ReportStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor

public class ReportDetailResponse {

    private Long id;
    private String name;
    private String type;
    private String filePath;
    private ReportStatus status;
    private String summary;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
