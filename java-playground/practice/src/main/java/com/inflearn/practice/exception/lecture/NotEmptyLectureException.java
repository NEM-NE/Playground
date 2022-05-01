package com.inflearn.practice.exception.lecture;

import org.springframework.http.HttpStatus;

public class NotEmptyLectureException extends LectureException{
	private static final String ERROR_CODE = "AB400";
	private static final HttpStatus HTTP_STATUS = HttpStatus.BAD_REQUEST;
	private static final String MESSAGE = "수강생이 존재하여 삭제할 수 없습니다.";

	public NotEmptyLectureException(){
		this(ERROR_CODE, HTTP_STATUS, MESSAGE);
	}

	public NotEmptyLectureException(String errorCode, HttpStatus httpStatus, String message){
		super(errorCode, httpStatus, message);
	}
}
