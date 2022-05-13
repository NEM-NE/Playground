package com.inflearn.practice.lecture.domain.users;

import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.user.domain.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Setter
@Getter
@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class LectureUser {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "lecture_id")
	private Lecture lecture;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
}
