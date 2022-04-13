package com.inflearn.practice.exception;

import com.inflearn.practice.exception.dto.ApiErrorResponse;

import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

	private static final String LOG_FORMAT = "Class : {}, Code : {}, Message : {}";
	private static final String INTERNAL_SERVER_ERROR_CODE = "S0001";

	@ExceptionHandler(ApplicationException.class)
	public ResponseEntity<ApiErrorResponse> applicationException(ApplicationException e) {
		String errorCode = e.getErrorCode();

		log.warn(LOG_FORMAT, e.getClass().getSimpleName(), errorCode, e.getMessage());

		return ResponseEntity
			.status(e.getHttpStatus())
			.body(new ApiErrorResponse(errorCode));
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiErrorResponse> runtimeException(RuntimeException e) {
		log.warn(LOG_FORMAT, e.getClass().getSimpleName(), INTERNAL_SERVER_ERROR_CODE, e.getMessage());

		return ResponseEntity
			.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(new ApiErrorResponse(INTERNAL_SERVER_ERROR_CODE));
	}
}
