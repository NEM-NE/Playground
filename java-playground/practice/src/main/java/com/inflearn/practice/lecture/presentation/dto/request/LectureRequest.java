package com.inflearn.practice.lecture.presentation.dto.request;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.inflearn.practice.lecture.domain.Category;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class LectureRequest {
	private Category category;
	@NotEmpty(message = "TITLE_MUST_HAVE_FILLED")
	private String title;
	private String description;
	@NotNull(message = "TEACHER_ID_MUST_HAVE_FILLED")
	private Long teacherId;
	private int price;
}
