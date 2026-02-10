package com.medkura.reportsystem.service;

import com.medkura.reportsystem.dto.ReportDetailResponse;
import com.medkura.reportsystem.dto.ReportListResponse;
import com.medkura.reportsystem.dto.ReportUploadResponse;
import com.medkura.reportsystem.entity.*;
import com.medkura.reportsystem.repository.ReportRepository;
import com.medkura.reportsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;
import java.util.stream.Collectors;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;

@Service
public class ReportService {

        private final ReportRepository reportRepository;
        private final UserRepository userRepository;

        public ReportService(ReportRepository reportRepository, UserRepository userRepository) {
                this.reportRepository = reportRepository;
                this.userRepository = userRepository;
        }

        public ReportUploadResponse uploadReport(MultipartFile file, String name, String type, Long userId)
                        throws IOException {
                User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

                String uploadDir = System.getProperty("user.dir") + "/uploads/";
                File dir = new File(uploadDir);
                if (!dir.exists())
                        dir.mkdirs();

                String filePath = uploadDir + System.currentTimeMillis()
                                + "_" + file.getOriginalFilename();

                file.transferTo(new File(filePath));

                if (name == null || name.isBlank())
                        throw new RuntimeException("Report name required");

                if (type == null || type.isBlank())
                        throw new RuntimeException("Report type required");

                if (file == null || file.isEmpty())
                        throw new RuntimeException("File required");

                Report report = Report.builder()
                                .name(name)
                                .type(type)
                                .filePath(filePath)
                                .status(ReportStatus.UPLOADED)
                                .createdAt(LocalDateTime.now())
                                .updatedAt(LocalDateTime.now())
                                .user(user)
                                .build();

                reportRepository.save(report);
                return new ReportUploadResponse(
                                report.getId(),
                                "Report uploaded successfully");

        }

        public List<ReportListResponse> getReports(Long userId) {
                User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

                return reportRepository.findByUser(user)
                                .stream()
                                .map(r -> new ReportListResponse(
                                                r.getId(),
                                                r.getName(),
                                                r.getType(),
                                                r.getStatus(),
                                                r.getCreatedAt()))
                                .collect(Collectors.toList());

        }

        public ReportDetailResponse getReport(Long id) {

                Report report = reportRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Report not found"));

                return new ReportDetailResponse(
                                report.getId(),
                                report.getName(),
                                report.getType(),
                                report.getFilePath(),
                                report.getStatus(),
                                report.getSummary(),
                                report.getCreatedAt(),
                                report.getUpdatedAt());
        }

        public void updateStatus(Long id, ReportStatus status) {

                Report report = reportRepository.findById(id)
                                .orElseThrow(() -> new RuntimeException("Report not found"));

                ReportStatus current = report.getStatus();

                if (current == ReportStatus.COMPLETED) {
                        throw new RuntimeException("Completed report cannot change status");
                }

                if (current == ReportStatus.UPLOADED
                                && status == ReportStatus.COMPLETED) {
                        throw new RuntimeException("Must process before completing");
                }

                report.setStatus(status);
                report.setUpdatedAt(LocalDateTime.now());

                if (status == ReportStatus.COMPLETED) {
                        report.setSummary(
                                        "This is an auto-generated summary for the medical report.");
                }

                reportRepository.save(report);
        }

}
