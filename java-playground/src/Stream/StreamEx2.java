package Stream;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamEx2 {
    public static void main(String[] args) {
        Stream<String[]> stream = Stream.of(new String[]{"AA", "BB", "CC"}, new String[]{"AAA", "BBB", "CCC"}, new String[]{"AAAA", "BBBB", "CCCC"});

//        stream.flatMap((mapper) -> Arrays.stream(mapper)).collect(Collectors.toList());
        stream.flatMap(Arrays::stream).forEach(System.out::println);

    }
}
