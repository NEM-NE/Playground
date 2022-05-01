package com.inflearn.practice.lecture.application.dto.request;

import com.inflearn.practice.lecture.domain.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LectureRequestDto {
	private Category category;
	private String title;
	private String description;
	private Long teacherId;
	private int price;
}
