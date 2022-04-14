package com.inflearn.practice.unit.lecture.application;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;
import com.inflearn.practice.lecture.domain.users.LectureUser;

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
		lectureList.add(Lecture.builder().id(1L).users(new ArrayList<LectureUser>()).build());
		lectureList.add(Lecture.builder().id(2L).users(new ArrayList<LectureUser>()).build());
		given(lectureRepository.findAll()).willReturn(lectureList);

		//when
		List<LectureResponseDto> list = lectureService.findAll();

		//then
		assertThat(list).hasSize(2);
	}

	@DisplayName("아이디로 강좌를 가져온다.")
	@Test
	void findById() {
		//given
		Lecture lecture = Lecture.builder().users(new ArrayList<LectureUser>()).build();
		given(lectureRepository.findById(anyLong())).willReturn(Optional.of(lecture));

		//when
		LectureResponseDto lectureResponseDto = lectureService.findById(1L);

		//then
		assertThat(lectureResponseDto).isNotNull();
	}

	@DisplayName("강좌를 등록한다.")
	@Test
	void insertOne() {
		//given
		LectureRequestDto lectureRequestDto = LectureRequestDto.builder()
			.title("test")
			.description("hi")
			.build();

		Lecture lecture = Lecture.builder()
			.id(1L)
			.status(LectureStatus.PAUSE)
			.title("test")
			.description("hi")
			.users(new ArrayList<>())
			.build();

		given(lectureRepository.save(any(Lecture.class))).willReturn(lecture);

		//when
		Long id = lectureService.insertOne(lectureRequestDto);

		//then
		assertThat(id).isEqualTo(1L);
	}
}