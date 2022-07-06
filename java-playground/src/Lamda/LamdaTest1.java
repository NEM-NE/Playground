package Lamda;

public class LamdaTest1 {

  public static void main(String[] args) {
    hello(() -> System.out.println("hello"));
  }

  public static void hello(SayHello sayHello) {
    System.out.println(sayHello.getName());
    sayHello.sayHi();
  }


  @FunctionalInterface
  interface SayHello {

    void sayHi();

    default String getName() {
      return "sungbin";
    }
  }

}

