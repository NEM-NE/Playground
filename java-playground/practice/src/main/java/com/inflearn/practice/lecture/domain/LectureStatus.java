package com.inflearn.practice.lecture.domain;

public enum LectureStatus {
	OPEN("OPEN", 1),
	PAUSE("PAUSE", 2),
	FUTURE("FUTURE", 3),
	CLOSED("CLOSED", 4);

	private String key;
	private int value;

	LectureStatus(String key, int value){
		this.key = key;
		this.value = value;
	}

}
