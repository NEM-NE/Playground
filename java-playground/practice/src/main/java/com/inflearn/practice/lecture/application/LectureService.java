package com.inflearn.practice.lecture.application;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inflearn.practice.exception.lecture.NoSuchLectureException;
import com.inflearn.practice.exception.lecture.NotEmptyLectureException;
import com.inflearn.practice.lecture.application.dto.LectureDtoAssembler;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LectureService {
	private final LectureRepository lectureRepository;

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

	public Long insertOne(LectureRequestDto lectureRequestDto) {
		Lecture lecture = Lecture.builder()
			.title(lectureRequestDto.getTitle())
			.description(lectureRequestDto.getDescription())
			.category(lectureRequestDto.getCategory())
			.price(lectureRequestDto.getPrice())
			.teacher(null) // 추후에 불러오는 코드 추가
			.status(LectureStatus.PAUSE)
			.users(new ArrayList<>())
			.build();

		Lecture result = lectureRepository.save(lecture);

		return result.getId();
	}

	@Transactional
	public LectureResponseDto update(Long id, LectureRequestDto lectureRequestDto) {
		Lecture lecture = lectureRepository.findById(id).orElseThrow(NoSuchLectureException::new);
		//본인인지 검증 필요
		lecture.update(lectureRequestDto);

		Lecture result = lectureRepository.save(lecture);

		return LectureDtoAssembler.toLectureResponseDto(result);
	}

	@Transactional
	public LectureResponseDto open(Long id){
		Lecture lecture = lectureRepository.findById(id).orElseThrow(NoSuchLectureException::new);
		lecture.openLecture();

		Lecture result = lectureRepository.save(lecture);

		return LectureDtoAssembler.toLectureResponseDto(result);
	}

	public LectureResponseDto delete(Long id) {
		Lecture lecture = lectureRepository.findById(id).orElseThrow(NoSuchLectureException::new);

		if(!lecture.getUsers().isEmpty()){
			throw new NotEmptyLectureException();
		}

		lectureRepository.deleteById(id);

		return LectureDtoAssembler.toLectureResponseDto(lecture);
	}
}
