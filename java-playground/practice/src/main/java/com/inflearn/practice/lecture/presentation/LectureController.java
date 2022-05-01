package com.inflearn.practice.lecture.presentation;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.presentation.dto.LectureAssembler;
import com.inflearn.practice.lecture.presentation.dto.request.LectureRequest;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lectures")
public class LectureController {
	private final LectureService lectureService;

	@GetMapping
	public ResponseEntity<List<LectureResponse>> findAll() {
		List<LectureResponseDto> lectureResponseDtoList = lectureService.findAll();
		List<LectureResponse> lectureResponses = LectureAssembler.toLectureResponses(lectureResponseDtoList);

		return ResponseEntity.ok(lectureResponses);
	}

	@GetMapping("/lecture/{id}")
	public ResponseEntity<LectureResponse> findById(@PathVariable Long id) {
		LectureResponseDto lectureResponseDto = lectureService.findById(id);
		LectureResponse lectureResponse = LectureAssembler.toLectureResponse(lectureResponseDto);

		return ResponseEntity.ok(lectureResponse);
	}

	@PostMapping("/lecture")
	public ResponseEntity<Long> insertOne(@Validated @RequestBody LectureRequest lectureRequest) {
		LectureRequestDto lectureRequestDto = LectureAssembler.toLectureRequestDto(lectureRequest);
		Long lectureId = lectureService.insertOne(lectureRequestDto);

		return ResponseEntity.status(HttpStatus.CREATED).body(lectureId);
	}

	@PutMapping("/lecture/{id}")
	public ResponseEntity<LectureResponse> update(@PathVariable Long id, @Validated @RequestBody LectureRequest lectureRequest) {
		LectureRequestDto lectureRequestDto = LectureAssembler.toLectureRequestDto(lectureRequest);

		LectureResponseDto lectureResponseDto = lectureService.update(id, lectureRequestDto);
		LectureResponse lectureResponse = LectureAssembler.toLectureResponse(lectureResponseDto);

		return ResponseEntity.ok(lectureResponse);
	}

	@PutMapping("/lecture/open/{id}")
	public ResponseEntity<LectureResponse> open(@PathVariable Long id){

		LectureResponseDto lectureResponseDto = lectureService.open(id);
		LectureResponse lectureResponse = LectureAssembler.toLectureResponse(lectureResponseDto);

		return ResponseEntity.ok(lectureResponse);
	}

	@DeleteMapping("/lecture/{id}")
	public ResponseEntity<LectureResponse> delete(@PathVariable Long id){
		LectureResponseDto lectureResponseDto = lectureService.delete(id);
		LectureResponse lectureResponse = LectureAssembler.toLectureResponse(lectureResponseDto);

		return ResponseEntity.ok(lectureResponse);
	}
}
