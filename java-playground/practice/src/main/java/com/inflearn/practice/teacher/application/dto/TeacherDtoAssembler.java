package com.inflearn.practice.teacher.application.dto;

import java.util.stream.Collectors;

import com.inflearn.practice.lecture.application.dto.LectureDtoAssembler;
import com.inflearn.practice.teacher.application.dto.response.TeacherResponseDto;
import com.inflearn.practice.teacher.domain.Teacher;

public class TeacherDtoAssembler {

	private TeacherDtoAssembler() {
		throw new IllegalStateException("Utility Class");
	}

	public static TeacherResponseDto toTeacherResponseDto(Teacher teacher){
		return TeacherResponseDto.builder()
			.id(teacher.getId())
			.email(teacher.getEmail())
			.name(teacher.getName())
			.password(teacher.getPassword())
			.rate(teacher.getRate())
			.lectures(teacher.getLectures().stream()
				.map(LectureDtoAssembler::toLectureResponseDto)
				.collect(Collectors.toList()))
			.build();
	}

}
