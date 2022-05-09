package com.inflearn.practice.lecture.presentation.dto.request;

import javax.validation.constraints.Min;
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
	//enum 체크
	private Category category;
	@NotEmpty(message = "TITLE_MUST_HAVE_FILLED")
	private String title;
	private String description;
	@NotNull(message = "TEACHER_ID_MUST_HAVE_FILLED")
	private Long teacherId;
	@Min(message = "PRICE_MUST_BE_POSITIVE", value = 0L)
	private int price;
}
