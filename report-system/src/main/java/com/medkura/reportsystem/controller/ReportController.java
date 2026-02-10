package com.medkura.reportsystem.controller;

import com.medkura.reportsystem.dto.ReportDetailResponse;
import com.medkura.reportsystem.dto.ReportListResponse;
import com.medkura.reportsystem.dto.ReportUploadResponse;
import com.medkura.reportsystem.dto.StatusUpdateRequest;
import com.medkura.reportsystem.service.ReportService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/api/reports")

public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @PostMapping
    public ReportUploadResponse uploadReport(
            @RequestParam MultipartFile file,
            @RequestParam String name,
            @RequestParam String type,
            @RequestParam Long userId) throws Exception {
        return reportService.uploadReport(file, name, type, userId);
    }

    @GetMapping
    public List<ReportListResponse> getReports(
            @RequestParam Long userId) {
        return reportService.getReports(userId);
    }

    @GetMapping("/{id}")
    public ReportDetailResponse getReport(@PathVariable Long id) {
        return reportService.getReport(id);
    }

    @PatchMapping("/{id}/status")
    public void updateStatus(
            @PathVariable Long id,
            @RequestBody StatusUpdateRequest request) {
        reportService.updateStatus(id, request.getStatus());
    }

}
