package com.inflearn.practice.unit;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.inflearn.practice.lecture.application.LectureService;
import com.inflearn.practice.lecture.presentation.LectureController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest({
        LectureController.class
})
public abstract class ControllerTest {
    @MockBean
    protected LectureService lectureService;

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;
}
