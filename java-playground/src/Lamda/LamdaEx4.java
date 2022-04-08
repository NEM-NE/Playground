package Lamda;

import java.util.function.BiPredicate;
import java.util.function.Consumer;
import java.util.function.Function;

public class LamdaEx4 {
    public static void main(String[] args) {
        BiPredicate<String, String> biPredicate = String::equals;
        Function<String, Integer> function = Integer::parseInt;
        Consumer<String> consumer = System.out::println;
    }
}
