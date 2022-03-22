package Annotation;

import java.util.ArrayList;
import java.util.List;

@TestInfo(
        count=3, testedBy = "Kim",
        testTools = {"JUnit", "AutoTester"},
        testType = TestType.FIRST,
        testDate = @DateTime(yymmdd = "160101", hhmmss = "235959")
)
public class Test {
    public static void main(String[] args) {

        System.out.println(count);
    }
}
