package com.medkura.reportsystem.controller;

import com.medkura.reportsystem.dto.ReportDetailResponse;
import com.medkura.reportsystem.dto.ReportListResponse;
import com.medkura.reportsystem.dto.ReportUploadResponse;
import com.medkura.reportsystem.dto.StatusUpdateRequest;
import com.medkura.reportsystem.entity.Report;
import com.medkura.reportsystem.repository.ReportRepository;
import com.medkura.reportsystem.service.ReportService;

import org.springframework.core.io.UrlResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import java.io.File;
import java.nio.file.Files;

@RestController
@RequestMapping("/api/reports")

public class ReportController {

    private final ReportService reportService;
    private final ReportRepository reportRepository;

    public ReportController(
            ReportService reportService,
            ReportRepository reportRepository) {
        this.reportService = reportService;
        this.reportRepository = reportRepository;
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

    @GetMapping("/{id}/file")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long id) throws Exception {

        Report report = reportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        File file = new File(report.getFilePath());
        Resource resource = new UrlResource(file.toURI());

        String contentType = Files.probeContentType(file.toPath());
        if (contentType == null) {
            contentType = "application/octet-stream";
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"" + file.getName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, contentType)
                .body(resource);
    }

}
