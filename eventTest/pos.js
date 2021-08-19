const OrderQueue = require('./orderqueue.js');

class Pos{
    constructor() {
        this.orderQueue = OrderQueue.getInstance();
    }

    convertOrder(str){
        const ary = str.split(':');
        const idx = parseInt(ary[0]);
        const cnt = parseInt(ary[1]);
        const orders = [];

        for(let i = 0; i < cnt; i++){
            orders.push(idx);
        }

        this.sendOrder(orders);
    }

    sendOrder(orders){
        this.orderQueue.eventEmitter.on('pushOrder', orders);
    }
}