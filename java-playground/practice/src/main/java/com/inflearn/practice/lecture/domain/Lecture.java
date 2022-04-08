package com.inflearn.practice.lecture.domain;

import com.inflearn.practice.lecture.domain.users.LectureUser;
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
public class Lecture {

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

    @OneToMany(mappedBy = "lecture")
    private List<LectureUser> users;
}
