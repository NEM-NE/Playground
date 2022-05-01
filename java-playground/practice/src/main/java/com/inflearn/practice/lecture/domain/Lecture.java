package com.inflearn.practice.lecture.domain;

import com.inflearn.practice.common.BaseTimeEntity;
import com.inflearn.practice.exception.lecture.AlreadyOpenLectureException;
import com.inflearn.practice.lecture.application.dto.request.LectureRequestDto;
import com.inflearn.practice.lecture.domain.users.LectureUser;
import com.inflearn.practice.teacher.domain.Teacher;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Lecture extends BaseTimeEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Enumerated(EnumType.STRING)
	private Category category;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false)
	private int price;

	@Lob
	private String description;

	@Enumerated(EnumType.ORDINAL)
	@Column(nullable = false)
	private LectureStatus status;

	@OneToMany(mappedBy = "lecture")
	private List<LectureUser> users;

	@ManyToOne
	@JoinColumn(name = "teacher_id")
	private Teacher teacher;

	public void update(LectureRequestDto lectureRequestDto){
		this.category = lectureRequestDto.getCategory();
		this.title = lectureRequestDto.getTitle();
		this.description = lectureRequestDto.getDescription();
		this.price = lectureRequestDto.getPrice();
	}

	public void openLecture(){
		if(getStatus() == LectureStatus.OPEN) {
			throw new AlreadyOpenLectureException();
		}

		status = LectureStatus.OPEN;
	}
}
