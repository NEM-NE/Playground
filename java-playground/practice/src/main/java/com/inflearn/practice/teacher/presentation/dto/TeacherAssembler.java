package com.inflearn.practice.teacher.presentation.dto;

import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.inflearn.practice.lecture.presentation.dto.LectureAssembler;
import com.inflearn.practice.teacher.application.dto.response.TeacherResponseDto;
import com.inflearn.practice.teacher.presentation.dto.response.TeacherResponse;

@Component
public class TeacherAssembler {

	private TeacherAssembler() {
		throw new IllegalStateException("Utility class");
	}

	public static TeacherResponse toTeacherResponseDtoFunc(TeacherResponseDto teacherResponseDto){
		return toTeacherResponseDtoFunc().apply(teacherResponseDto);
	}

	private static Function<TeacherResponseDto, TeacherResponse> toTeacherResponseDtoFunc(){
		return teacherResponseDto -> TeacherResponse.builder()
			.id(teacherResponseDto.getId())
			.email(teacherResponseDto.getEmail())
			.name(teacherResponseDto.getName())
			.rate(teacherResponseDto.getRate())
			.password(teacherResponseDto.getPassword())
			.lectures(teacherResponseDto.getLectures().stream()
				.map(LectureAssembler::toLectureResponse)
				.collect(Collectors.toList()))
			.build();
	}

}
