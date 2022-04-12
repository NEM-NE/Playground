package com.inflearn.practice.unit.lecture.application;

import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;
import com.inflearn.practice.lecture.domain.users.LectureUser;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class LectureServiceTest {

    @InjectMocks
    LectureService lectureService;

    @Mock
    LectureRepository lectureRepository;

    @DisplayName("모든 강좌를 가져온다.")
    @Test
    void findAll() {
        //given
        List<Lecture> lectureList = new ArrayList<Lecture>();
        lectureList.add(Lecture.builder()
                .id(1L)
                .users(new ArrayList<LectureUser>())
                .build());
        lectureList.add(Lecture.builder()
                .id(2L)
                .users(new ArrayList<LectureUser>())
                .build());
        given(lectureRepository.findAll()).willReturn(lectureList);

        //when
        List<LectureResponseDto> list = lectureService.findAll();

        //then
        assertThat(list.size()).isEqualTo(2);
    }

    @Test
    void findById() {
        //given
        Lecture lecture = Lecture.builder()
                .users(new ArrayList<LectureUser>())
                .build();
        given(lectureRepository.findById(anyLong())).willReturn(Optional.of(lecture));

        //when
        LectureResponseDto lectureResponseDto = lectureService.findById(1L);

        //then
        assertThat(lectureResponseDto).isNotNull();
    }
}