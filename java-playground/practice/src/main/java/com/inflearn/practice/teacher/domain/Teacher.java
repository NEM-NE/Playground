package com.inflearn.practice.teacher.domain;

import com.inflearn.practice.common.BaseTimeEntity;
import com.inflearn.practice.lecture.domain.Lecture;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class Teacher extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String name;

    private String password;

    private Float rate;

    @OneToMany(mappedBy = "teacher")
    private List<Lecture> lectures;
}
