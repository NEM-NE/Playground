/*

유니온 타입

매개변수 id는 유니온 타입으로 지정할 경우 고유 메서드를 사용 x

*/

const test:number | string | Player | null = 2; 

type Player = {
    code: number | string | null;
}

function printId(id: number | string) {
    if (typeof id === 'string') {
      console.log(id.toUpperCase());
    } else if (typeof id === 'number') {
      console.log(id);
    }
  
    console.log(`your id is ${id}`);
  }
  
  printId(4);