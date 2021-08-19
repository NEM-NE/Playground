const readline = require('readline');

class EventLoop{
    constructor(){
        this.queue = [];
    }

    addEvent(event, cnt){
        for(let i = 0; i < cnt; i++){
            this.queue.push(event);
        }

        this.start();
    }

    start(){
        setTimeout(() => {
            while(this.queue.length != 0){
                this.nextTask();
            }
        }, 4000);
    }

    nextTask(){
        const event = this.queue.shift();

        console.log(event);
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
const eventLoop = new EventLoop();

const question = () => {
    rl.question('plz input event > ', (answer) => {    //ex) touch:3
        if(answer == 'quit') rl.close();
        
        const ary = answer.split(':');
        const event = ary[0];
        const cnt = ary[1];

        eventLoop.addEvent(event, cnt);

        question();
    });
}

question();
