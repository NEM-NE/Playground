/*

ts는 정적 타입을 사용하기 때문에 변수, 함수, 클래스 등에서 타입을 미리 명시해줘야한다.

        JS  TS
boolean	◯	◯	true와 false
null	◯	◯	값이 없다는 것을 명시
undefined◯	◯	값을 할당하지 않은 변수의 초기값
number	◯	◯	숫자(정수와 실수, Infinity, NaN)
string	◯	◯	문자열
symbol	◯	◯	고유하고 수정 불가능한 데이터 타입이며 주로 객체 프로퍼티들의 식별자로 사용(ES6에서 추가)
object	◯	◯	객체형(참조형)
array	 	◯	배열
tuple	 	◯	고정된 요소수 만큼의 타입을 미리 선언후 배열을 표현
enum	 	◯	열거형. 숫자값 집합에 이름을 지정한 것이다.
any	 	    ◯	타입 추론(type inference)할 수 없거나 타입 체크가 필요없는 변수에 사용. var 키워드로 선언한 변수와 같이 어떤 타입의 값이라도 할당 가능.
void	 	◯	일반적으로 함수에서 반환값이 없을 경우 사용한다.
never	 	◯	결코 발생하지 않는 값

*/

let sung: string = 'bin';

function multiply(a: number, b: number): number {
    return a * b;
}

const multiply2 = (a: number, b: number): number => {
    return a *b;
}

type Ball = {
    kind: string;
    id: number | null;
}

interface Ball2 {
    kind: string;
    id: number | null;
}

enum Color3 {Red = 1, Green = 2, Blue = 4};
let c3: Color3 = Color3.Blue;

// HTMLElement 타입
const elem: HTMLElement = document.getElementById('myId');

class Person { }
// Person 타입
const person: Person = new Person();



/* 타입 추론 */
const kk = 234; // 별도 선언 없이 number 결정됨


/*

타입단언 or 타입 캐스팅

해당 변수에 어떤 타입이 올지 모를 때 개발자는 어떤 타입이 올지 미리 알 수 있다.
타입을 확실히 사전에 정의할 때 사용

*/

const myCanvas = document.getElementById('main') as HTMLCanvasElement;  // as HTMLCanvasElement로 통해 myCanvas가 null | HTMLCanvasElement 중 HTMLCanvasElement로 타입이 고정 됐다.

let test2 = 'stringg'; // 타입 추론에 의해 string
const test3 = 'stringg'; // const는 문자열 자체를 리터럴 타입으로 지정

let test4 = 'stringg' as const; // let에서도 as const를 통해 리터럴 타입으로 지정

const obj = {   
    hello: 'obj',
}

const obj2 = { //hello 속성을 리터럴 타입으로 변경 할 수 있다.
    hello: 'obj',
} as const


/*

리터럴 타입

원시타입이여도 특정 값 혹은 커스텀 타입으로 타입을 정의할 수 있다.
일반적으론 하나의 값만으로 사용하지 않고 유니온 타입을 사용하여 선언한다.
*/

const literal: 'literal' = 'literal';

function printText(s: string, alignment: Point2 | 'right' | 'center'): -1 | 0 | 1 {
  return 0;
}

const req = {
  right: 'right', //  as const 상수 단언을 통해 right으로 타입을 설정 할 수 있다.
};

// 타입 단언을 사용해줘야한다.
printText('s', req.right as 'right');

/*

strictNullChecks를 설정했다면 사용하기 전에 undefined 테스트를 해야만한다.
만약 해당 검사를 하고 싶지 않다면 !를 통해 undefined가 아니라는 것을 단언해야한다.

*/

function liveDangerously(x?: number | undefined) {
  console.log(x!.toFixed());
}
