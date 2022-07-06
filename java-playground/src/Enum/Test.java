package Enum;

public class Test {
  public static Test sung = new Test("sung");
  public static Test bin = new Test("bin");

  private String name;

  private Test(String name){
    this.name = name;
  }

  public String getName() {
    return name;
  }

}


