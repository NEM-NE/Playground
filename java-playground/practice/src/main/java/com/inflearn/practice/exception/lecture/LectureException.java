package com.inflearn.practice.exception.lecture;

import com.inflearn.practice.exception.ApplicationException;

import org.springframework.http.HttpStatus;

public abstract class LectureException extends ApplicationException {
	protected LectureException(String errorCode, HttpStatus httpStatus, String message) {
		super(errorCode, httpStatus, message);
	}
}
