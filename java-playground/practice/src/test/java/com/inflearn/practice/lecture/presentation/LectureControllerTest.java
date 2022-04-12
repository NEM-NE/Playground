package com.inflearn.practice.lecture.presentation;

import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.application.dto.response.LectureResponseDto;
import com.inflearn.practice.lecture.domain.Category;
import com.inflearn.practice.lecture.domain.Lecture;
import com.inflearn.practice.lecture.domain.LectureStatus;
import com.inflearn.practice.lecture.domain.repository.LectureRepository;
import com.inflearn.practice.lecture.presentation.dto.response.LectureResponse;
import com.inflearn.practice.teacher.domain.Teacher;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.BDDAssertions.then;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Slf4j
class LectureControllerTest {

    @Autowired
    MockMvc mvc;

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
    private LectureService lectureService;

    @Autowired
    private LectureRepository lectureRepository;

    @Autowired
    private WebApplicationContext ctx;

    @BeforeEach
    void setUp() {
        this.mvc = MockMvcBuilders.webAppContextSetup(ctx)
                .addFilters(new CharacterEncodingFilter("UTF-8", true))
                .alwaysDo(print())
                .build();
    }

    @AfterEach
    void tearDown() {
    }

    @Test
    @DisplayName("모든 강좌 목록을 찾는다.")
    void findAll() throws Exception {
        lectureRepository.save(Lecture.builder()
                .category(Category.ALL)
                .description("hihi")
                .price(17000)
                .status(LectureStatus.OPEN)
                .title("titie")
                .build());

        mvc.perform(get("/lectures"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json;charset=UTF-8"))
                .andDo(print());

        ResponseEntity<LectureResponse[]> response = restTemplate.getForEntity("/lectures", LectureResponse[].class);
        then(response.getStatusCode()).isEqualTo(HttpStatus.OK);
        then(response.getStatusCode()).isNotNull();

        List<LectureResponseDto> list = lectureService.findAll();
        if(!list.isEmpty()){
            then(list.size()).isEqualTo(1);
            LectureResponseDto lectureResponseDto = list.get(0);
            then(lectureResponseDto.getCategory()).isEqualTo(Category.ALL);
            then(lectureResponseDto.getDescription()).isEqualTo("hihi");
            then(lectureResponseDto.getPrice()).isEqualTo(17000);
        }

    }

    @Test
    @DisplayName("특정 강좌를 찾는다.")
    void findById() {
    }
}