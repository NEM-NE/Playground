package com.inflearn.practice.lecture.presentation.dto.response;

import java.time.LocalDateTime;
import java.util.List;

import com.inflearn.practice.lecture.domain.Category;
import com.inflearn.practice.lecture.domain.LectureStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureResponse {
	private Long id;
	private Category category;
	private String title;
	private int price;
	private String description;
	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;
	private LectureStatus status;
	private String teacherName;
	private Long teacherId;
	private List<UserResponse> users;
}
