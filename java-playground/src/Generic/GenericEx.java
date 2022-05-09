package Generic;

import java.util.ArrayList;
import java.util.Comparator;

public class GenericEx {
    public static void main(String[] args) {
//        Box<Toy> box = new Box<Toy>();
//        ArrayList<? extends Fruit> list = new ArrayList<>();
//        list.add(new Toy());

    }
}

class Fruit {

}

class Apple extends Fruit{

}

class Toy {

}

class Box<T extends Fruit> {
    ArrayList<T> list = new ArrayList<T>();

    public Box(){

    }
}

class Juicer {
    static Fruit makeJuice(Box<Fruit> box) {
        return new Fruit();
    }
}
