package com.inflearn.practice.lecture.presentation;

import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.presentation.dto.LectureAssembler;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/lectures")
public class LectureController {
    private final LectureService lectureService;

    @GetMapping
    public ResponseEntity<List<LectureResponse>> findAll(){
        List<LectureResponseDto> lectureResponseDtoList = lectureService.findAll();

        List<LectureResponse> lectureResponses = LectureAssembler.toLectureResponses(lectureResponseDtoList);

        return ResponseEntity.ok(lectureResponses);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LectureResponse> findById(@PathVariable Long id) {
        LectureResponseDto lectureResponseDto = lectureService.findById(id);
        LectureResponse lectureResponse = LectureAssembler.toLectureResponse(lectureResponseDto);

        return ResponseEntity.ok(lectureResponse);
    }

    @GetMapping("/sort")
    public ResponseEntity<List<LectureResponse>> searchLecture(
            @RequestParam("category") String category,
            @PageableDefault(size = 10) Pageable pageable)
    {

        List<LectureResponseDto> lectureResponseDtoList = lectureService.searchLecture(category, pageable);
        List<LectureResponse> lectureResponses = LectureAssembler.toLectureResponses(lectureResponseDtoList);

        return ResponseEntity.ok(lectureResponses);
    }

}
