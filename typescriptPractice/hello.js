function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet('sungSSbin', new Date());
const msg = 'string!!';
const names = ['sungbin', 'seon', 'saeboak'];
names.forEach((e) => {
  console.log(e.toUpperCase());
});
// 옵셔널 프로퍼티 ?를 사용하면 해당 값이 없을 경우 런타임 오류가 아니라 undefined로 인자
function printCoord(pt) {
  console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
}
printCoord({ x: 4, y: 3 });
printCoord({ x: 4 });
/*

유니온 타입

매개변수 id는 유니온 타입으로 지정할 경우 고유 메서드를 사용 x

*/
function printId(id) {
  if (typeof id === 'string') {
    console.log(id.toUpperCase());
  } else if (typeof id === 'number') {
    console.log(id);
  }
  console.log(`your id is ${id}`);
}
printId(4);
function printCoord2(pt) {
  console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
}
printCoord2({ x: 4, y: 3 });
/*

타입단언

해당 변수에 어떤 타입이 올지 모를 때 개발자는 어떤 타입이 올지 미리 알 수 있다.
타입을 확실히 사전에 정의할 때 사용

*/
const myCanvas = document.getElementById('main');
