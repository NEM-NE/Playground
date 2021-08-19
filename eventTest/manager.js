const EventEmitter = require('events');
const OrderQueue = require('./orderqueue.js');

class Manager extends EventEmitter {
    constructor(){
        this.orderQueue = OrderQueue.getInstance();
        this.chef = new Chef();
        super();
    }

    start(){
        setInterval(() => {
            if(!this.orderQueue.isEmpty()){
                if(this.chef.state !== 'cooking'){
                    const order = this.orderQueue.eventEmitter.emit('getOrder');
                    this.chef.cook(order);
                }
            }
        }, 1000);
    }
}