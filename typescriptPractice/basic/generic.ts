/*

제네릭

타입스크립트는 정적 언어 => 범용적으로 재사용성 하기 어려움 => 제네릭 사용

any 대신 사용

*/

// function merge<A, B>(a: A, b: B): [A, B]{
    function merge<A, B>(a: A, b: B): A & B {
        return {
          ...a,
          ...b
        };
      }
      
      const merged = merge({ foo: 1 }, { bar: 1 });
      
      interface Items<T> {
        list: T[];
      }
      
      const items: Items<string> = {
        list: ['a', 'b', 'c'],
      }
      
      class Queue<T> {
        list: T[] = [];
      
        constructor(public size: number){
          this.size = size;
          this.list.length = size;
        }
      
        get length(){
          return this.list.length;
        }
      }
      
      const queue = new Queue<string>(4);