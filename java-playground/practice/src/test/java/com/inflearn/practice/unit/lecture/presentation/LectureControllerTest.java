package com.inflearn.practice.unit.lecture.presentation;

import com.inflearn.practice.exception.lecture.NoSuchLectureException;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.application.dto.response.UserResponseDto;
import com.inflearn.practice.lecture.domain.Category;
import com.inflearn.practice.unit.ControllerTest;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class LectureControllerTest extends ControllerTest {

	@DisplayName("모든 강좌 조회")
	@Test
	public void findAll() throws Exception {
		//given
		List<LectureResponseDto> lectureResponseDtos = lectureResponseDtos();
		given(lectureService.findAll()).willReturn(lectureResponseDtos);

		String response = objectMapper.writeValueAsString(lectureResponseDtos);

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

	@DisplayName("id로 특정 강좌 조회")
	@Test
	public void findById() throws Exception {
		//given
		LectureResponseDto lectureResponseDto = lectureResponseDto(1);
		given(lectureService.findById(anyLong())).willReturn(lectureResponseDto);

		String responseBody = objectMapper.writeValueAsString(lectureResponseDto);

		//when
		final ResultActions resultActions = mockMvc.perform(
			MockMvcRequestBuilders.get("/lectures/1")
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
			MockMvcRequestBuilders.get("/lectures/1")
		);

		//then
		resultActions
			.andExpect(status().isBadRequest())
			.andExpect(jsonPath("errorCode").value("AB404"));
	}

	private LectureResponseDto lectureResponseDto(long id) {
		LectureResponseDto dto = LectureResponseDto.builder()
			.title("hi")
			.price(17000)
			.description("hi")
			.id(id)
			.category(Category.ALL)
			.users(new ArrayList<UserResponseDto>())
			.build();
		return dto;
	}
}