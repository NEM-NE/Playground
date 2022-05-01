package com.inflearn.practice.lecture.application.dto;

import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;

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
			.userSize(lecture.getUsers().size())
			.build();
	}
}
