package com.inflearn.practice.teacher.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.inflearn.practice.teacher.domain.Teacher;

public interface TeacherRepository extends JpaRepository<Teacher, Long> {
	List<Teacher> findByNameContainingIgnoreCase(String keyword);
}
