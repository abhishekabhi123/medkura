package com.medkura.reportsystem.repository;

import com.medkura.reportsystem.entity.Report;
import com.medkura.reportsystem.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByUser(User user);
}
