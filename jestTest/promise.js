//기본 구조
console.log('1');

console.log('2');

console.log('3');

/*
    결과 => 1 2 3

    console.log()메서드는 동기 메서드이므로 순차적으로 진행된다.
*/

//비동기 1
console.log('1');

setTimeout(() => console.log('2'));

console.log('3');

/*
    결과 => 1 3 2

    setTimeout()은 비동기 메서드로 특정 시간뒤에 메서드가 실행된다. 
    비동기 메서드인 이유는 그 전까지 모든 작업이 멈춰야되어서 매우 비효율적이므로 
*/

//promise 1
console.log('1');

new Promise(() => {
    console.log('2');
})

console.log('3');

/*
    결과 => 1 2 3

    promise를 감싸줘도 비동기 메서드가 아니면 그냥 실행됨.
*/

//promise 2
console.log('1');

new Promise(() => {
    setTimeout(() => console.log('2'));
})

console.log('3');

/*
    결과 => 1 3 2

    setTimeout()으로 비동기를 promise안에 걸어줬지만 이후 추가 동작이 없어 그냥 동작함
*/

//promise 3
console.log('1');

new Promise((resolve) => {
    setTimeout(() => {
        resolve();
    })
}).then(() => console.log('2'));

console.log('3');

/*
    결과 => 1 3 2

    setTimeout()이후 console.log('2')를 실행 시켰지만 이미 동기 메서드인 console.log('3')가 동작함
*/

//promise 4
console.log('1');

new Promise((resolve) => {
    setTimeout(() => {
        console.log('2');
        resolve();
    })
}).then(() => console.log('3'));

/*
    결과 => 1 2 3

    비동기 메서드에서 2를 출력하고 끝난 이후에야 동작할 수 있는 then에서 3을 출력하게 함으로써 순차적으로 동작이 가능하게 함.
*/

// 그러면 1부터 10을 출력하는데 2가 비동기이면 3 에서 10까지는 다 then을 넣고 실행해야함?

//promise 5
console.log('1');

new Promise((resolve) => {
    setTimeout(() => {
        console.log('2');
        resolve();
    })
}).then(() => {
    console.log('3');
    console.log('4');
    console.log('5');
    console.log('6');
    new Promise((resolve) => {
        setTimeout(() => {
            console.log('7');
            resolve();
        })
    }).then(() => {
        console.log('8');
        console.log('9');
    });
})

/*
    결과 => 1 2 3 4 5 6 7 8 9

    비동기 메서드에서 2를 출력하고 끝난 이후에야 동작할 수 있는 then에서 3을 출력하게 함으로써 순차적으로 동작이 가능하게 함.
*/

//promise 6
console.log('1');

new Promise((resolve) => {
    setTimeout(() => {
        console.log('2');
        resolve();
    })
}).then(() => {
    console.log('3');
    console.log('4');
    console.log('5');
    console.log('6');
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('7');
            resolve();
        })
    })
}).then(() => {
    console.log('8');
    console.log('9');
});

/*
    결과 => 1 2 3 4 5 6 7 8 9

    return promise를 걸어줘서 then을 연속적으로 사용할 수 있게 함.
*/

//promise 7
console.log('1');

const two = new Promise((resolve) =>{
    setTimeout(() => {
        resolve(2);
    })
})

const three = new Promise((resolve) =>{
    setTimeout(() => {
        resolve(3);
    })
})

Promise.all([two, three])
    .then((ary) => ary.forEach((num) => console.log(num)));

/*
    결과 => 1 2 3
    promise.all()은 매개변수로 promise를 받고 then을 통해 promise들이 resolve한 객체를 배열로 담아 then()매개변수로 전달한다.
*/