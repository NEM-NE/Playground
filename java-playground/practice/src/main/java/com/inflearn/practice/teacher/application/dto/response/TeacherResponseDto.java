package com.inflearn.practice.teacher.application.dto.response;

import java.util.List;

import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeacherResponseDto {
	private Long id;
	private String email;
	private String name;
	private String password;
	private Float rate;
	private List<LectureResponseDto> lectures;
}
