package com.inflearn.practice.lecture.domain.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.inflearn.practice.lecture.domain.Lecture;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

	List<Lecture> findByCategory(String category);

	List<Lecture> findByTitle(String keyword, Pageable pageable);
}
