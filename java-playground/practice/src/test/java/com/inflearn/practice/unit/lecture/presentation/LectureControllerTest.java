package com.inflearn.practice.unit.lecture.presentation;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.inflearn.practice.exception.lecture.NoSuchLectureException;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Category;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.presentation.dto.LectureAssembler;
import com.inflearn.practice.lecture.presentation.dto.request.LectureRequest;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;
import com.inflearn.practice.unit.ControllerTest;

class LectureControllerTest extends ControllerTest {

	@DisplayName("모든 강좌 조회")
	@Test
	void findAll() throws Exception {
		//given
		List<LectureResponseDto> lectureResponseDtos = lectureResponseDtos();
		given(lectureService.findAll()).willReturn(lectureResponseDtos);

		List<LectureResponse> lectureResponses = lectureResponse();
		String response = objectMapper.writeValueAsString(lectureResponses);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.get("/lectures")
		);

		//then
		resultActions
			.andExpect(status().isOk())
			.andExpect(content().string(response));
	}

	private List<LectureResponseDto> lectureResponseDtos() {
		List<LectureResponseDto> lectureResponseDtos = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			LectureResponseDto dto = lectureResponseDto(i);
			lectureResponseDtos.add(dto);
		}

		return lectureResponseDtos;
	}

	private List<LectureResponse> lectureResponse() {
		List<LectureResponse> lectureResponse = new ArrayList<>();
		for (int i = 0; i < 10; i++) {
			LectureResponse dto = lectureResponse(i);
			lectureResponse.add(dto);
		}

		return lectureResponse;
	}

	@DisplayName("id로 특정 강좌 조회")
	@Test
	void findById() throws Exception {
		//given
		LectureResponseDto lectureResponseDto = lectureResponseDto(1);
		given(lectureService.findById(anyLong())).willReturn(lectureResponseDto);

		LectureResponse lectureResponse = lectureResponse(1);
		String responseBody = objectMapper.writeValueAsString(lectureResponse);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.get("/lectures/lecture/1")
		);

		//then
		resultActions
			.andExpect(status().isOk())
			.andExpect(content().string(responseBody));
	}

	@DisplayName("id로 특정 강좌 조회 - 없는 경우")
	@Test
	void findById_ExceptionThrow() throws Exception {
		//given
		given(lectureService.findById(anyLong())).willThrow(new NoSuchLectureException());

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.get("/lectures/lecture/1")
		);

		//then
		resultActions
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("errorCode").value("AB404"));
	}

	private LectureResponseDto lectureResponseDto(long id) {
		return LectureResponseDto.builder()
			.title("hi")
			.price(17000)
			.description("hi")
			.id(id)
			.category(Category.ALL)
			.teacherName("nemne")
			.teacherId(1L)
			.userSize(10)
			.build();
	}

	private LectureResponse lectureResponse(long id) {
		return LectureResponse.builder()
			.title("hi")
			.price(17000)
			.description("hi")
			.id(id)
			.category(Category.ALL)
			.teacherName("nemne")
			.teacherId(1L)
			.userSize(10)
			.build();
	}

	@DisplayName("강좌 등록")
	@Test
	void insertOne() throws Exception {
		//given
		final LectureRequest lectureRequest = LectureRequest.builder()
			.title("test")
			.description("hi")
			.teacherId(1L)
			.build();

		given(lectureService.insertOne(any())).willReturn(1L);

		String responseBody = objectMapper.writeValueAsString(1L);
		String requestBody = objectMapper.writeValueAsString(lectureRequest);
		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders
				.post("/lectures/lecture")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON)
		);

		//then
		resultActions
			.andExpect(status().isCreated())
			.andExpect(content().string(responseBody));
	}

	@DisplayName("강좌 등록 - 제목 유효성 검증 실패")
	@Test
	void insertOne_TitleValidationError() throws Exception {
		//given
		final LectureRequest lectureRequest = LectureRequest.builder()
			.description("hi")
			.teacherId(1L)
			.build();

		String requestBody = objectMapper.writeValueAsString(lectureRequest);
		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders
				.post("/lectures/lecture")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON)
		);

		//then
		resultActions
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("errorCode").value("TITLE_MUST_HAVE_FILLED"));
	}

	@DisplayName("강좌 등록 - 강사 아이디 유효성 검증 실패")
	@Test
	void insertOne_TeacherIdValidationError() throws Exception {
		//given
		final LectureRequest lectureRequest = LectureRequest.builder()
			.title("test")
			.description("hi")
			.build();

		String requestBody = objectMapper.writeValueAsString(lectureRequest);
		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders
				.post("/lectures/lecture")
				.content(requestBody)
				.contentType(MediaType.APPLICATION_JSON)
		);

		//then
		resultActions
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("errorCode").value("TEACHER_ID_MUST_HAVE_FILLED"));
	}

	@DisplayName("강좌 수정")
	@Test
	void update() throws Exception {
		//given
		final LectureRequest lectureRequest = LectureRequest.builder()
			.title("testtest")
			.description("changeContent")
			.teacherId(1L)
			.build();

		final LectureResponseDto lectureResponseDto = LectureResponseDto.builder()
			.title("testtest")
			.description("changeContent")
			.build();

		final LectureResponse lectureResponse = LectureResponse.builder()
			.title("testtest")
			.description("changeContent")
			.build();

		given(lectureService.update(anyLong(), any(LectureRequestDto.class))).willReturn(lectureResponseDto);

		String requestBody = objectMapper.writeValueAsString(lectureRequest);
		String responseBody = objectMapper.writeValueAsString(lectureResponse);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.put("/lectures/lecture/1")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody)
		);

		//then
		resultActions
			.andExpect(status().isOk())
			.andExpect(content().string(responseBody));
	}

	@DisplayName("강좌 오픈")
	@Test
	void open() throws Exception {
		//given
		final LectureResponseDto lectureResponseDto = LectureResponseDto.builder()
			.title("testtest")
			.category(Category.APP)
			.description("changeContent")
			.status(LectureStatus.OPEN)
			.build();

		final LectureResponse lectureResponse = LectureResponse.builder()
			.title("testtest")
			.category(Category.APP)
			.description("changeContent")
			.status(LectureStatus.OPEN)
			.build();

		given(lectureService.open(anyLong())).willReturn(lectureResponseDto);

		String responseBody = objectMapper.writeValueAsString(lectureResponse);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.put("/lectures/lecture/open/1")
				.contentType(MediaType.APPLICATION_JSON)
		);

		//then
		resultActions
			.andExpect(status().isOk())
			.andExpect(content().string(responseBody));
	}

	@DisplayName("강좌 삭제")
	@Test
	void delete() throws Exception {
		//given
		LectureResponseDto lectureResponseDto = LectureResponseDto.builder()
			.id(1L)
			.title("hihi")
			.build();

		LectureResponse lectureResponse = LectureResponse.builder()
			.id(1L)
			.title("hihi")
			.build();

		given(lectureService.delete(anyLong())).willReturn(lectureResponseDto);

		String responseBody = objectMapper.writeValueAsString(lectureResponse);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.delete("/lectures/lecture/1")
		);

		//then
		resultActions
			.andExpect(status().isOk())
			.andExpect(content().string(responseBody));
	}

	@DisplayName("강좌를 삭제 - 존재하는 강좌가 없을 경우")
	@Test
	void delete_not_found() throws Exception {
		//given
		given(lectureService.delete(anyLong())).willThrow(new NoSuchLectureException());

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.delete("/lectures/lecture/1")
		);

		//then
		resultActions
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("errorCode").value("AB404"));
	}

}