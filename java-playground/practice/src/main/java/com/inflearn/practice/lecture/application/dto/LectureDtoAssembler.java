package com.inflearn.practice.lecture.application.dto;

import java.util.function.Function;
import java.util.stream.Collectors;

import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.application.dto.response.UserResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.users.LectureUser;

public class LectureDtoAssembler {

	private LectureDtoAssembler() {
		throw new IllegalStateException("Utility Class");
	}

	public static LectureResponseDto toLectureResponseDto(Lecture lecture) {

		return LectureResponseDto.builder()
			.id(lecture.getId())
			.category(lecture.getCategory())
			.status(lecture.getStatus())
			.title(lecture.getTitle())
			.price(lecture.getPrice())
			.description(lecture.getDescription())
			.createdDate(lecture.getCreatedDate())
			.lastModifiedDate(lecture.getLastModifiedDate())
			.teacherId(lecture.getTeacher().getId())
			.teacherName(lecture.getTeacher().getName())
			.users(lecture.getUsers().stream()
				.map(toUserResponseDto()).collect(Collectors.toList()))
			.build();
	}

	private static Function<LectureUser, UserResponseDto> toUserResponseDto(){
		return user -> new UserResponseDto(user.getUser().getId(), user.getUser().getEmail(),
			user.getUser().getName(), user.getUser().getCreatedDate());
	}
}
