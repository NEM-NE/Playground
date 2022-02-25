const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('second');
    }, 0);
})

console.log('first');

promise.then((result) => {
    console.log(result);
    console.log('third');
}, (result) => {
    console.log(result);
    console.log('fail');
});