const EventEmitter = require('events');

const OrderQueue = (function() {

    // 비공개 프로퍼티 정의
    let instance;
    const queue = [];
    const eventEmitter = new EventEmitter();
    const menu = ['ramen', 'chicken', 'pizza'];
    const time = [3, 5, 7];

    eventEmitter.on('getOrder', () => {
        return queue.shift();
    })

    eventEmitter.on('pushOrder', (orders) => {

        orders.forEach(element => {
            queue.push({
                menu : menu[element],
                time : time[element],
            });
        });

    })

    // 비공개 메서드 정의
    function init() {

        // singleton 인스턴스 정의
        return {

            eventEmitter : eventEmitter,
            isEmpty(){
                return queue.length === 0
            }

        };

    }

    // 공개 메서드인 getInstance를 정의한 객체, 비공개 프로퍼티 및 메서드에 접근 가능(클로저)
    return {

        getInstance: function() {

            // 인스턴스가 선언이 안되있는경우 인스턴스 생성
            if (!instance) {
                instance = init();
            }

            // 인스턴스가 선언이 되있는 경우 인스턴스 반환
            return instance;

        }
    }
})()

module.exports = OrderQueue