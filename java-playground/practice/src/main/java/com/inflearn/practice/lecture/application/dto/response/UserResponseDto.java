package com.inflearn.practice.lecture.application.dto.response;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDto {
	private Long id;
	private String email;
	private String name;
	private LocalDateTime createdDate;
}
