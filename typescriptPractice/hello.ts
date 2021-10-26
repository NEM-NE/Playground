// function greet(person: string, date: Date): void {
//   console.log(`Hello ${person}, today is ${date.toDateString()}!`);
// }

// greet('sungSSbin', new Date());

// const msg: string = 'string!!';

// const names = ['sungbin', 'seon', 'saeboak'];

// names.forEach((e) => {
//   console.log(e.toUpperCase());
// });

// // 옵셔널 프로퍼티 ?를 사용하면 해당 값이 없을 경우 런타임 오류가 아니라 undefined로 인자
// function printCoord(pt: { x: number, y?: number}) {
//   console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
// }

// printCoord({ x: 4, y: 3 });
// printCoord({ x: 4 });

// /*

// 유니온 타입

// 매개변수 id는 유니온 타입으로 지정할 경우 고유 메서드를 사용 x

// */

// function printId(id: number | string) {
//   if (typeof id === 'string') {
//     console.log(id.toUpperCase());
//   } else if (typeof id === 'number') {
//     console.log(id);
//   }

//   console.log(`your id is ${id}`);
// }

// printId(4);

// // 타입 별칭 (타입 엘리어스)

// type Point = {
//     x: number,
//     y: number | string,
//     z?: number,
// }

// type Point3 = Point & {
//   z: number;
// }

// /*

// 인터페이스

// 타입 별칭과 차이점 => 인터페이스는 상속을 통해 확장 가능 & 기존 인터페이스에 새 필드 추가 가능

// 복수 상속 가능

// */
// interface Point2 {
//     x: number,
//     y: number,
// }

// function printCoord2(pt: Point) {
//   console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
// }

// printCoord2({ x: 4, y: 3 });

// /*

// 타입단언 or 타입 캐스팅

// 해당 변수에 어떤 타입이 올지 모를 때 개발자는 어떤 타입이 올지 미리 알 수 있다.
// 타입을 확실히 사전에 정의할 때 사용

// */

// const myCanvas = document.getElementById('main') as HTMLCanvasElement;  // as HTMLCanvasElement로 통해 myCanvas가 null | HTMLCanvasElement 중 HTMLCanvasElement로 타입이 고정 됐다.

// /*

// 리터럴 타입

// 원시타입이여도 특정 값 혹은 커스텀 타입으로 타입을 정의할 수 있다.
// 일반적으론 하나의 값만으로 사용하지 않고 유니온 타입을 사용하여 선언한다.
// */

// const literal: 'literal' = 'literal';

// function printText(s: string, alignment: Point2 | 'right' | 'center'): -1 | 0 | 1 {
//   return 0;
// }

// const req = {
//   right: 'right', //  as const 상수 단언을 통해 right으로 타입을 설정 할 수 있다.
// };

// // 타입 단언을 사용해줘야한다.
// printText('s', req.right as 'right');

// /*

// strictNullChecks를 설정했다면 사용하기 전에 undefined 테스트를 해야만한다.
// 만약 해당 검사를 하고 싶지 않다면 !를 통해 undefined가 아니라는 것을 단언해야한다.

// */

// function liveDangerously(x?: number | undefined) {
//   console.log(x!.toFixed());
// }


// /*

// 클래스에서 인터페이스 사용하기

// */

// interface Shape {
//   getArea(): number;
// }

// class Circle implements Shape {
//   // public or private를 사용하면 변수 선언을 생략할 수 있다.
//   constructor(public radius: number){
//     this.radius = radius;
//   }
//   getArea(): number {
//     return this.radius * this.radius * Math.PI;
//   }
// }

// class Retangle implements Shape {
//   width: number;
//   height: number;

//   constructor(width: number, height: number){
//     this.width = width;
//     this.height = height;
//   }
//   getArea(): number {
//     return this.width * this.height;
//   }
// }

// const circle = new Circle(5);
// const retangle = new Retangle(5, 4);

// // 배열로 감싸서 사용할 수 있다. 단 공통 인터페이스의 부분만 사용가능
// const shapes: Shape[] = [circle, retangle];

// shapes.forEach((shape) => {
//   shape.getArea();
// })

// /*

// 제네릭

// 타입스크립트는 정적 언어 => 범용적으로 재사용성 하기 어려움 => 제네릭 사용

// any 대신 사용

// */

// // function merge<A, B>(a: A, b: B): [A, B]{
// function merge<A, B>(a: A, b: B): A & B {
//   return {
//     ...a,
//     ...b
//   };
// }

// const merged = merge({ foo: 1 }, { bar: 1 });

// interface Items<T> {
//   list: T[];
// }

// const items: Items<string> = {
//   list: ['a', 'b', 'c'],
// }

// class Queue<T> {
//   list: T[] = [];

//   constructor(public size: number){
//     this.size = size;
//     this.list.length = size;
//   }

//   get length(){
//     return this.list.length;
//   }
// }

// const queue = new Queue<string>(4);

// /*

// 덕 타이핑

// 인터페이스에서 생성되지 않아도 요구하는 속성이 같을 경우 올바르게 동작한다.

// */

// interface IDuck {
//   quack(): void;
//   readonly name: string;  // readonly는 오로직 읽기만 가능 => 상수 선언에 사용
// }

// class Duck implements IDuck {
//   //private 설정
//  constructor(public readonly name:string){
//    this.name = name;
//  }
//  quack() {
//    console.log('quack!!!!');
//    console.log()
//  }
// }

// class DifferDuck {
//   name: string = 'human'
//   quack() {
//     console.log('hi');
//   }
// }

// function makeNoise(duck: IDuck) {
//   duck.quack();
// }

// const duck = new Duck('donaldo');
// const duck2 = new DifferDuck();

// makeNoise(duck);
// makeNoise(duck2); //makeNoise에서 IDuck 매개변수가 없어도 오류 없이 정상적으로 동작한다.


// /*

// 접근 제한자

// */

// class Foo {
//   protected y: string;
//   private z: string;
//   readonly name: string = 'test';  // readonly는 오로직 읽기만 가능 => 상수 선언에 사용

//   constructor(public x: string, y: string, z: string) {
//     // public, protected, private 접근 제한자 모두 클래스 내부에서 참조 가능하다.
//     this.x = x;
//     this.y = y;
//     this.z = z;
//   }

//   static sayHi(){ //static 선언 가능
//     console.log('hi');
//   }
// }

// const foo = new Foo('x', 'y', 'z');

// Foo.sayHi();

// // public 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조 가능하다.
// console.log(foo.x);

// // protected 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
// console.log(foo.y);
// // error TS2445: Property 'y' is protected and only accessible within class 'Foo' and its subclasses.

// // private 접근 제한자는 클래스 인스턴스를 통해 클래스 외부에서 참조할 수 없다.
// console.log(foo.z);
// // error TS2341: Property 'z' is private and only accessible within class 'Foo'.

// class Bar extends Foo {
//   constructor(x: string, y: string, z: string) {
//     super(x, y, z);

//     // public 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
//     console.log(this.x);

//     // protected 접근 제한자는 자식 클래스 내부에서 참조 가능하다.
//     console.log(this.y);

//     // private 접근 제한자는 자식 클래스 내부에서 참조할 수 없다.
//     console.log(this.z);
//     // error TS2341: Property 'z' is private and only accessible within class 'Foo'.
//   }
// }

// abstract class Animal {
//   abstract makeSound(): void;

//   move(): void {
//     console.log('zzzzz');
//   }
// }

// // const test = new Animal(); // 추상 클래스는 인스턴스 생성 불가능

// class Dog extends Animal {
//   // 추상 클래스를 상속한 클래스는 추상 클래스의 추상 메소드를 반드시 구현하여야 한다
//   makeSound() {
//     console.log('bowwow~~');
//   }
// }

// const myDog = new Dog();
// myDog.makeSound();
// myDog.move();