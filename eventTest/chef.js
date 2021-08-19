const PublisherCenter = require('./publisherCenter.js');

class Chef{
    constructor(){
        this.state = 'wait'
        this.publisherCenter = PublisherCenter.getInstance();
    }

    postEvent(menu, state){
        //publishercenter에서 데이터를 전달한다.(eventemitter가 반응해서 dashboard에 전달한다.)
        this.publisherCenter.postEvent(menu, state);
    }

    cook(order){
        this.postEvent(order.menu, 'start');
        new Promise((resolve) => {
            setTimeout(() => {
                console.log(`${order.menu}가 요리 중입니다.`);
                resolve();
            }, order.time * 1000);
        }).then(() =>{
            this.postEvent(order.menu, 'end');
        })
    }
}