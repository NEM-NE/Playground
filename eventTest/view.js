const readline = require('readline');
const Pos = require('./pos.js');
const Manager = require('./manager.js');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const pos = new Pos();
const manager = new Manager();

manager.start();

console.log('> 메뉴  =  1. 라면(3분)    2. 떡볶이(7분)    3. 닭볶음탕(15분)');

const question = () =>{
    rl.question(`주문할 음료를 입력하세요. 예) 라면 2개 => 1:2  `, (answer) => {
        if(answer == 'quit') rl.close();
      
        pos.convertOrder(answer);

        question();
      });
}