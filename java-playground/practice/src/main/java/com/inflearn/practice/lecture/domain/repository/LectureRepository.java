package com.inflearn.practice.lecture.domain.repository;

import com.inflearn.practice.lecture.domain.Category;
import com.inflearn.practice.lecture.domain.Lecture;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LectureRepository extends JpaRepository<Lecture, Long> {

    List<Lecture> findByCategory(String category);
}
