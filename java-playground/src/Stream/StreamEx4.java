package Stream;

import java.util.ArrayList;
import java.util.stream.Collectors;

public class StreamEx4 {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();

        for(int i = 0; i < 20; i++){
            list.add(i);
        }

        list.parallelStream().map(i -> i).forEach(System.out::println);


//        list.stream().map(i -> i*100).collect(Collectors.joining());
    }
}

