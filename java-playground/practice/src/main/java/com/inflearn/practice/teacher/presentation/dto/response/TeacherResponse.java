package com.inflearn.practice.teacher.presentation.dto.response;

import java.util.List;

import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherResponse {
	private Long id;
	private String email;
	private String name;
	private String password;
	private Float rate;
	private List<LectureResponse> lectures;
}
