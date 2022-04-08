package Lamda;

import java.util.Arrays;
import java.util.function.IntUnaryOperator;

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
    }
}
