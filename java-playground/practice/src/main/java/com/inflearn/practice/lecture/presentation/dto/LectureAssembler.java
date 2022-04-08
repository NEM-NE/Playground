package com.inflearn.practice.lecture.presentation.dto;

import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;
import com.inflearn.practice.lecture.presentation.dto.response.UserResponse;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class LectureAssembler {

    public static List<LectureResponse> toLectureResponses(List<LectureResponseDto> responseDtos){
        return responseDtos.stream().map(toLectureResponseFunc()).collect(Collectors.toList());
    }

    public static LectureResponse toLectureResponse(LectureResponseDto lectureResponseDto) {
        return toLectureResponseFunc().apply(lectureResponseDto);
    }

    private static Function<LectureResponseDto, LectureResponse> toLectureResponseFunc() {
        return LectureResponseDto -> LectureResponse.builder()
                .id(LectureResponseDto.getId())
                .category(LectureResponseDto.getCategory())
                .title(LectureResponseDto.getTitle())
                .price(LectureResponseDto.getPrice())
                .description(LectureResponseDto.getDescription())
                .users(LectureResponseDto.getUsers().stream().map(user -> UserResponse.builder()
                        .id(user.getId())
                        .email(user.getEmail())
                        .name(user.getName())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
