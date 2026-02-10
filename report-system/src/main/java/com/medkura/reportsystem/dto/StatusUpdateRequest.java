package com.medkura.reportsystem.dto;

import com.medkura.reportsystem.entity.ReportStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class StatusUpdateRequest {
    private ReportStatus status;
}
