package Annotation;

public @interface TestInfo {
    int count();
    String testedBy();
    String[] testTools();
    TestType testType();
    DateTime testDate();
}

enum TestType {
    FIRST, FINAL
}

@interface DateTime {
    String yymmdd();
    String hhmmss();
}


