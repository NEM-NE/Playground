package com.inflearn.practice.lecture.application;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.inflearn.practice.exception.lecture.NoSuchLectureException;
import com.inflearn.practice.exception.lecture.NotEmptyLectureException;
import com.inflearn.practice.lecture.application.dto.LectureDtoAssembler;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Filter;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;
import com.inflearn.practice.lecture.domain.users.LectureUser;
import com.inflearn.practice.teacher.domain.Teacher;
import com.inflearn.practice.teacher.domain.repository.TeacherRepository;
import com.inflearn.practice.user.domain.User;
import com.inflearn.practice.user.domain.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class LectureService {
	private final LectureRepository lectureRepository;
	private final TeacherRepository teacherRepository;
	private final UserRepository userRepository;

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findAll() {
		List<Lecture> list = lectureRepository.findAll();

		return list.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findByPageable(String keyword, Filter filter, Pageable pageable) {
		if(filter == Filter.TEACHER_NAME){
			return findByTeacherName(keyword, pageable);
		}else if(filter == Filter.LECTURE_NAME){
			return findByLectureName(keyword, pageable);
		}else if(filter == Filter.USERID){
			return findByUserId(keyword, pageable);
		}

		//default
		return findByTeacherName(keyword, pageable);
	}

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findByTeacherName(String keyword, Pageable pageable) {
		// 강사이름으로 강사 조회 & 관련된 강의 조회
		List<Teacher> teachers = teacherRepository.findByNameContainingIgnoreCase(keyword);

		List<Lecture> lectures = teachers.stream().map(Teacher::getLectures).reduce(new ArrayList<Lecture>(), (acc, cur) -> {
			acc.addAll(cur);
			return acc;
		});

		return lectures.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findByLectureName(String keyword, Pageable pageable) {
		List<Lecture> list = lectureRepository.findByTitle(keyword, pageable);
		return list.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
	}

	@Transactional(readOnly = true)
	public List<LectureResponseDto> findByUserId(String keyword, Pageable pageable) {
		// 유저아이디로 유저 조회 & 관련 강의 조회
		List<User> users = userRepository.findByName(keyword, pageable);

		List<LectureUser> lectureUsers = users.stream().map(User::getLectures).reduce(new ArrayList<LectureUser>(), (acc, cur) -> {
			acc.addAll(cur);
			return acc;
		});
		List<Lecture> lectures = lectureUsers.stream().map(LectureUser::getLecture).collect(Collectors.toList());

		return lectures.stream().map(LectureDtoAssembler::toLectureResponseDto).collect(Collectors.toList());
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
