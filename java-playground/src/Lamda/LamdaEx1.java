package Lamda;

import java.util.Arrays;
import java.util.Comparator;
import java.util.function.*;

public class LamdaEx1 {
    public static void main(String[] args) {
        int[] arr = new int[5];
        Arrays.setAll(arr, (i) -> (int)(Math.random() * 5) + 1);

        Arrays.setAll(arr, new IntUnaryOperator() {
            @Override
            public int applyAsInt(int operand) {
                return (int)(Math.random() * 5) + 1;
            }
        });

        Function<Integer, Integer> func = new Function<Integer, Integer>() {
            @Override
            public Integer apply(Integer integer) {
                return integer;
            }
        };

        Function<Integer, Integer> func2 = (o1) -> o1;

        Consumer<Integer> consumer = System.out::println;

        Function<Integer, Integer> andThen = func.andThen(func2);

        Predicate<String> predicate = (String str) -> str.startsWith("T");

        Supplier<String> supplier = () -> "hihi";

        func.apply(4);
        func.apply(3);

        consumer.accept(1515);

        boolean isTAXI = predicate.test("BUS");
        System.out.println(isTAXI);

        supplier.get();

        Function<MMethod, String> methodFunc = MMethod::sayHello;
    }
}

class MMethod {
    public MMethod(){

    }

    public String sayHello() {
        return "hihi";
    }
}