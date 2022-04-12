package com.inflearn.practice.lecture.presentation.dto.response;

import com.inflearn.practice.lecture.application.dto.response.UserResponseDto;
import com.inflearn.practice.lecture.domain.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LectureResponse {
    private Long id;
    private Category category;
    private String title;
    private int price;
    private String description;
    private LocalDateTime createdDate;
    private LocalDateTime lastModifiedDate;
    private List<UserResponse> users;
}
