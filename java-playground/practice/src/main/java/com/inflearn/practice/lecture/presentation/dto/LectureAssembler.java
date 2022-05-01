package com.inflearn.practice.lecture.presentation.dto;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.presentation.dto.request.LectureRequest;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;

@Component
public class LectureAssembler {

	private LectureAssembler() {
		throw new IllegalStateException("Utility class");
	}

	public static List<LectureResponse> toLectureResponses(List<LectureResponseDto> responseDtos) {
		return responseDtos.stream().map(toLectureResponseFunc()).collect(Collectors.toList());
	}

	public static LectureResponse toLectureResponse(LectureResponseDto lectureResponseDto) {
		return toLectureResponseFunc().apply(lectureResponseDto);
	}

	public static LectureRequestDto toLectureRequestDto(LectureRequest lectureRequest) {
		return toLectureRequestDtoFunc().apply(lectureRequest);
	}

	private static Function<LectureRequest, LectureRequestDto> toLectureRequestDtoFunc() {
		return lectureRequest -> LectureRequestDto.builder()
			.category(lectureRequest.getCategory())
			.title(lectureRequest.getTitle())
			.description(lectureRequest.getDescription())
			.teacherId(lectureRequest.getTeacherId())
			.price(lectureRequest.getPrice())
			.build();
	}

	private static Function<LectureResponseDto, LectureResponse> toLectureResponseFunc() {
		return lectureResponseDto -> LectureResponse.builder()
			.id(lectureResponseDto.getId())
			.category(lectureResponseDto.getCategory())
			.status(lectureResponseDto.getStatus())
			.title(lectureResponseDto.getTitle())
			.price(lectureResponseDto.getPrice())
			.description(lectureResponseDto.getDescription())
			.createdDate(lectureResponseDto.getCreatedDate())
			.lastModifiedDate(lectureResponseDto.getLastModifiedDate())
			.teacherName(lectureResponseDto.getTeacherName())
			.teacherId(lectureResponseDto.getTeacherId())
			.userSize(lectureResponseDto.getUserSize())
			.build();
	}
}
