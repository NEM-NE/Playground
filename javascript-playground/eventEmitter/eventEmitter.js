const {EventEmitter} = require('events');

class Test extends EventEmitter {
    constructor(){
        super();
        this.
        this.on('say', () => console.log('sayWhat?'));
    }
}

class Foo extends EventEmitter {
    constructor(){
        super();
    }

    sayTest(){
        console.log('what?!');
        this.emit('say');
    }

}

const test = new Test();
const foo = new Foo();

foo.sayTest();