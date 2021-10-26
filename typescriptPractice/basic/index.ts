function greet(person: string, date: Date): void {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
  }
  
  greet('sungSSbin', new Date());
  
  const msg: string = 'string!!';
  
  const names = ['sungbin', 'seon', 'saeboak'];
  
  names.forEach((e) => {
    console.log(e.toUpperCase());
  });
  
  // 옵셔널 프로퍼티 ?를 사용하면 해당 값이 없을 경우 런타임 오류가 아니라 undefined로 인자
  function printCoord(pt: { x: number, y?: number}) {
    console.log(`the coordinate's value is ${pt.x} ${pt.y}`);
  }
  
  printCoord({ x: 4, y: 3 });
  printCoord({ x: 4 });
  