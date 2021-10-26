/*

인터페이스

타입 별칭과 차이점 => 인터페이스는 상속을 통해 확장 가능 & 기존 인터페이스에 새 필드 추가 가능

복수 상속 가능

*/
interface Point2 {
    x: number,
    y: number,
}

interface Point4 {
    z: number;
    q: number;
}

interface Point5 extends Point2, Point4 {
    sayHello(): void;
}

function printCoord2(pt: Point) {
  console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
}

printCoord2({ x: 4, y: 3 });

/*

클래스에서 인터페이스 사용하기

*/

interface Shape {
    getArea(): number;
  }
  
  class Circle implements Shape {
    // public or private를 사용하면 변수 선언을 생략할 수 있다.
    constructor(public radius: number){
      this.radius = radius;
    }
    getArea(): number {
      return this.radius * this.radius * Math.PI;
    }
  }
  
  class Retangle implements Shape {
    width: number;
    height: number;
  
    constructor(width: number, height: number){
      this.width = width;
      this.height = height;
    }
    getArea(): number {
      return this.width * this.height;
    }
  }
  
  const circle = new Circle(5);
  const retangle = new Retangle(5, 4);

  // 배열로 감싸서 사용할 수 있다. 단 공통 인터페이스의 부분만 사용가능
const shapes: Shape[] = [circle, retangle];

shapes.forEach((shape) => {
  shape.getArea();
})

/*

덕 타이핑

인터페이스에서 생성되지 않아도 요구하는 속성이 같을 경우 올바르게 동작한다.

*/

interface IDuck {
    quack(): void;
    readonly name: string;  // readonly는 오로직 읽기만 가능 => 상수 선언에 사용
  }
  
  class Duck implements IDuck {
    //private 설정
   constructor(public readonly name:string){
     this.name = name;
   }
   quack() {
     console.log('quack!!!!');
     console.log()
   }
  }
  
  class DifferDuck {
    name: string = 'human'
    quack() {
      console.log('hi');
    }
  }
  
  function makeNoise(duck: IDuck) {
    duck.quack();
  }
  
  const duck = new Duck('donaldo');
  const duck2 = new DifferDuck();
  
  makeNoise(duck);
  makeNoise(duck2); //makeNoise에서 IDuck 매개변수가 없어도 오류 없이 정상적으로 동작한다.