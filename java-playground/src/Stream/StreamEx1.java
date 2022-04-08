package Stream;

import java.util.Arrays;
import java.util.Random;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class StreamEx1 {
    public static void main(String[] args) {
        Stream<Integer> strStream = Stream.of(1, 2, 3, 4);
        Stream<Integer> strStream2 = Stream.of(new Integer[]{1, 2, 3, 4});
        Stream<Integer> strStream3 = Arrays.stream(new Integer[]{1, 2, 3, 4});
        Stream<Integer> strStream4 = Arrays.stream(new Integer[]{1, 2, 3, 4}, 0 ,2);

        IntStream stream = IntStream.range(0, 11); // 0 ~ 11을

        // 크기가 정해지지 않았으므로 무한 stream
        IntStream stream1 = new Random().ints(); // 최소범위 <= 랜덤깂 배정 <= 최대범위
    }
}
