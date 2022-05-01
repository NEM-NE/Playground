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
import org.springframework.http.HttpStatus;

import com.inflearn.practice.exception.lecture.AlreadyOpenLectureException;
import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;
import com.inflearn.practice.lecture.domain.users.LectureUser;
import com.inflearn.practice.teacher.domain.Teacher;

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
		lectureList.add(Lecture.builder().id(1L).users(new ArrayList<LectureUser>()).teacher(new Teacher()).build());
		lectureList.add(Lecture.builder().id(2L).users(new ArrayList<LectureUser>()).teacher(new Teacher()).build());
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
		Lecture lecture = Lecture.builder().users(new ArrayList<LectureUser>()).teacher(new Teacher()).build();
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

	@DisplayName("강좌를 수정한다.")
	@Test
	void update() {
		//given
		Lecture lecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.description("temp")
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		Lecture newLecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.description("newContent")
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		LectureRequestDto lectureRequestDto = LectureRequestDto.builder()
			.title("hihi")
			.description("newContent")
			.build();

		given(lectureRepository.findById(anyLong())).willReturn(Optional.ofNullable(lecture));
		given(lectureRepository.save(any())).willReturn(newLecture);

		//when
		LectureResponseDto lectureResponseDto = lectureService.update(1L, lectureRequestDto);

		//then
		assertThat(lectureResponseDto.getDescription()).isEqualTo("newContent");
	}

	@DisplayName("강좌를 오픈한다.")
	@Test
	void open() {
		//given
		Lecture lecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.status(LectureStatus.FUTURE)
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		Lecture openLecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.status(LectureStatus.OPEN)
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		given(lectureRepository.findById(anyLong())).willReturn(Optional.ofNullable(lecture));
		given(lectureRepository.save(any())).willReturn(openLecture);

		//when
		LectureResponseDto result = lectureService.open(1L);
		//then
		assertThat(result.getStatus()).isEqualTo(LectureStatus.OPEN);
	}

	@DisplayName("강좌를 오픈한다. - 이미 오픈된 강좌일 경우")
	@Test
	void open_duplicated() {
		//given
		Lecture lecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.status(LectureStatus.OPEN)
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		Lecture openLecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.status(LectureStatus.OPEN)
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		given(lectureRepository.findById(anyLong())).willReturn(Optional.ofNullable(lecture));

		//when
		assertThatCode(() -> lectureService.open(1L))
			.isInstanceOf(AlreadyOpenLectureException.class)
			.hasFieldOrPropertyWithValue("errorCode", "AB500")
			.hasFieldOrPropertyWithValue("httpStatus", HttpStatus.BAD_REQUEST)
			.hasFieldOrPropertyWithValue("message", "이미 오픈된 강좌 개설 에러");
	}

	@DisplayName("강좌를 삭제한다.")
	@Test
	void delete(){
		//given
		Lecture lecture = Lecture.builder()
			.id(1L)
			.title("hihi")
			.status(LectureStatus.FUTURE)
			.teacher(new Teacher())
			.users(new ArrayList<LectureUser>())
			.build();

		given(lectureRepository.findById(anyLong())).willReturn(Optional.ofNullable(lecture));
		doNothing().when(lectureRepository).deleteById(anyLong());

		//when
		LectureResponseDto result = lectureService.delete(1L);

		//then
		assertThat(result.getId()).isEqualTo(1L);
	}
}