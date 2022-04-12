package com.inflearn.practice.lecture.application.dto;

import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.application.dto.response.UserResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;

import java.util.List;
import java.util.stream.Collectors;

public class LectureDtoAssembler {

    public static LectureResponseDto toLectureResponseDto(Lecture lecture){


        List<UserResponseDto> list = lecture.getUsers().stream().map(item -> UserResponseDto.builder()
                    .id(item.getUser().getId())
                    .email(item.getUser().getEmail())
                    .name(item.getUser().getName())
                    .build()
        ).collect(Collectors.toList());

        return LectureResponseDto.builder()
                .id(lecture.getId())
                .category(lecture.getCategory())
                .title(lecture.getTitle())
                .price(lecture.getPrice())
                .description(lecture.getDescription())
                .createdDate(lecture.getCreatedDate())
                .lastModifiedDate(lecture.getLastModifiedDate())
                .users(list)
                .build();
    }
}
