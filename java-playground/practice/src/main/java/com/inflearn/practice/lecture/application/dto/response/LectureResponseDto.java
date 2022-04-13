package com.inflearn.practice.lecture.application.dto.response;

import com.inflearn.practice.lecture.domain.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureResponseDto {
	private Long id;
	private Category category;
	private String title;
	private int price;
	private String description;
	private LocalDateTime createdDate;
	private LocalDateTime lastModifiedDate;
	private List<UserResponseDto> users;
}
