package com.inflearn.practice.exception.lecture;

import org.springframework.http.HttpStatus;

public class AlreadyOpenLectureException extends LectureException {
	private static final String ERROR_CODE = "AB500";
	private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;
	private static final String MESSAGE = "이미 오픈된 강좌 개설 에러";

	public AlreadyOpenLectureException() {
		this(ERROR_CODE, HTTP_STATUS, MESSAGE);
	}

	private AlreadyOpenLectureException(String errorCode, HttpStatus httpStatus, String message) {
		super(errorCode, httpStatus, message);
	}
}
