package com.medkura.reportsystem.service;

import com.medkura.reportsystem.dto.ReportUploadResponse;
import com.medkura.reportsystem.entity.*;
import com.medkura.reportsystem.repository.ReportRepository;
import com.medkura.reportsystem.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

        String uploadDir = "uploads/";
        File dir = new File(uploadDir);
        if (!dir.exists())
            dir.mkdirs();

        String filePath = uploadDir + System.currentTimeMillis()
                + "_" + file.getOriginalFilename();

        file.transferTo(new File(filePath));

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

}
