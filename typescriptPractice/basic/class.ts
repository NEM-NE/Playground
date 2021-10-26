/* 클래스 사용 */

class BaseballPlayer {
    name: string;
    score: number;
    team: string;

    constructor(public backNumber: number, name: string, score: number, team: string){
        this.backNumber = backNumber;
        this.name = name;
        this.score = score;
        this.team = team;
    }
}

/*

접근 제한자

*/

class Foo {
    protected y: string;
    private z: string;
    readonly name: string = 'test';  // readonly는 오로직 읽기만 가능 => 상수 선언에 사용
  
    constructor(public x: string, y: string, z: string) {
      // public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
      this.x = x;
      this.y = y;
      this.z = z;
    }
  
    static sayHi(){ //static 선언 가능
      console.log('hi');
    }
  }
  
  const foo = new Foo('x', 'y', 'z');
  
  Foo.sayHi();
  
  // public 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조 가능하다.
  console.log(foo.x);
  
  // protected 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
  console.log(foo.y);
  // error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.
  
  // private 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
  console.log(foo.z);
  // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
  
  class Bar extends Foo {
    constructor(x: string, y: string, z: string) {
      super(x, y, z);
  
      // public 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
      console.log(this.x);
  
      // protected 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
      console.log(this.y);
  
      // private 접근 제한자는 자식 클래스 내부에서 참조할 수 없다.
      console.log(this.z);
      // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
    }
  }



  /* 추상 클래스 */

  abstract class Animal {
    abstract makeSound(): void;
  
    move(): void {
      console.log('zzzzz');
    }
  }
  
  // const test = new Animal(); // 추상 클래스는 인스턴스 생성 불가능
  
  class Dog extends Animal {
    // 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다
    makeSound() {
      console.log('bowwow~~');
    }
  }
  
  const myDog = new Dog();
  myDog.makeSound();
  myDog.move();