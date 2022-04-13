package com.inflearn.practice.lecture.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum Category {
	WEB("WEB", "WEB"),
	APP("APP", "APP"),
	GAME("GAME", "GAME"),
	ALGORITHM("ALGORITHM", "ALGORITHM"),
	INFRASTRUCTURE("INFRASTRUCTURE", "INFRASTRUCTURE"),
	DATABASE("DATABASE", "DATABASE"),
	ALL("ALL", "ALL");

	private final String key;
	private final String value;
}
