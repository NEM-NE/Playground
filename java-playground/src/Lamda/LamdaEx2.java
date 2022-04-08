package Lamda;

import java.util.function.*;

public class LamdaEx2 {
    public static void main(String[] args) {
        // 매개변수는 없고 리턴만 해주는 경우 Supplier<R>
        Supplier<Integer> supplier = () -> (int)(Math.random() * 5) + 1;

        // 매개변수 1개 리턴 X
        Consumer<Integer> consumer = (idx) -> System.out.println(idx);
        //Consumer<Integer> consumer = System.out::println;

        // 매개변수 1개 리턴 O  Function<T, R>
        Function<Integer, Integer> function = (idx) -> (int)(Math.random() * idx) + 1;

        // 매개변수 1개 리턴 타입은 boolean => 조건식 테스트 용도로 활용 가능
        Predicate<Integer> predicate = (idx) -> idx >= 0;

        /*
         매개 변수가 2개인 경우
        */

        BiConsumer<Integer, Integer> biConsumer = (acc, cur) -> System.out.println(acc + cur);
        BiFunction<Integer, Integer, Integer> biFunction = (acc, cur) -> acc + cur;
        //BiFunction<Integer, Integer, Integer> biFunction = Integer::sum;
        BiPredicate<Integer, Integer> biPredicate = (num1, num2) -> num1 >= num2;

    }
}
