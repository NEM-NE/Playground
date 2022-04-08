package Lamda;

import java.util.function.Function;
import java.util.function.Predicate;

public class LamdaEx3 {
    public static void main(String[] args) {
        Function<Integer, String> function = (idx) -> (int)(Math.random() * idx) + 1 + "";
        Function<String, Integer> function1 = (idx) -> (int)(Math.random() * Integer.parseInt(idx)) + 1;

        Function<Integer, Integer> function2 = function.andThen(function1);

        Predicate<Integer> predicate = (idx) -> idx > 0;
        Predicate<Integer> predicate2 = (idx) -> idx == 0;
        Predicate<Integer> predicate3 = predicate.or(predicate2);
        predicate3.test(4);
    }
}
