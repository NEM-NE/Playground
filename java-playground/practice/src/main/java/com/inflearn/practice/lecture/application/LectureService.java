package com.inflearn.practice.lecture.application;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inflearn.practice.exception.lecture.NoSuchLectureException;
import com.inflearn.practice.lecture.application.dto.LectureDtoAssembler;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LectureService {
	private final LectureRepository lectureRepository;

	//    @Transactional(readOnly = true)
	//    public List<LectureResponseDto> searchLecture(String category, Pageable pageable) {
	//        List<Lecture> list = lectureRepository.findByCategory(category);
	//
	//        return list.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
	//    }

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findAll() {
		List<Lecture> list = lectureRepository.findAll();

		return list.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public LectureResponseDto findById(Long id) {
		Lecture lecture = lectureRepository.findById(id).orElseThrow(NoSuchLectureException::new);

		return LectureDtoAssembler.toLectureResponseDto(lecture);
	}

	//    public void insertLecture(LectureRequestDto lectureRequestDto) {
	//        Lecture lecture = LectureDtoAssembler.lecture(lectureRequestDto);
	//
	//        lectureRepository.save(lecture);
	//    }
}
