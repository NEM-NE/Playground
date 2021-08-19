const EventEmitter = require('events');

const PublisherCenter = (function() {

    // 비공개 프로퍼티 정의
    let instance;

    // 비공개 메서드 정의
    function init() {

        // singleton 인스턴스 정의
        return {

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

module.exports = PublisherCenter