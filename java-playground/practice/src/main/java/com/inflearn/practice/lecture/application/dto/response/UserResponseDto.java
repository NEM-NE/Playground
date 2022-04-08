package com.inflearn.practice.lecture.application.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
public class UserResponseDto {

    private Long id;
    private String email;
    private String name;

    public UserResponseDto(Long id, String email, String name){
        this.id = id;
        this.email = email;
        this.name = name;
    }
}
