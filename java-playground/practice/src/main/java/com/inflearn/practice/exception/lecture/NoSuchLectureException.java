package com.inflearn.practice.exception.lecture;

import org.springframework.http.HttpStatus;

public class NoSuchLectureException extends LectureException {
	private static final String ERROR_CODE = "AB404";
	private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;
	private static final String MESSAGE = "존재하지 않은 강좌 조회 에러";

	public NoSuchLectureException() {
		this(ERROR_CODE, HTTP_STATUS, MESSAGE);
	}

	private NoSuchLectureException(String errorCode, HttpStatus httpStatus, String message) {
		super(errorCode, httpStatus, message);
	}
}
