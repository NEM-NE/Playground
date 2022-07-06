package Enum;

public class EnumEx {

  enum Direction {
    EAST,
    WEST,
    SOUTH,
    NORTH
  }

  public static void main(String[] args) {
    Direction d1 = Direction.EAST;
    Direction d2 = Direction.WEST;

    System.out.println(Direction.valueOf(Direction.class, "WEST"));

    System.out.println(Test.sung.getName());

  }
}
