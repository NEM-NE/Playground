function all(iterable){

}

function allSettled(iterable){

}

function any(){

}

function race(){

}

function resolve(data){
    console.dir(this);
    this.resolveCb(data);
}

function reject(data){
    return {state:'REJECT', data}
}

function then(resolveCb, rejectCb){
    this.resolve.resolveCb = resolveCb;
    this.resolve = this.resolve.bind(this);
    const result = this.cb(this.resolve, this.reject);
}

function MyPromise(cb){
    this.state = 'PENDING';
    this.cb = cb;
    MyPromise.prototype.then = then.bind(this);
    MyPromise.prototype.resolve = resolve.bind(this);
    MyPromise.prototype.reject = reject.bind(this);
}

MyPromise.all = all.bind(this);
MyPromise.allSettled = allSettled.bind(this);
MyPromise.any = any.bind(this);
MyPromise.race = race.bind(this);

MyPromise.prototype.catch = () => {
    
}

MyPromise.prototype.finally = () => {
}

//example
const promise = new MyPromise((resolve, reject) => {
    setTimeout(() => {
        const data = 'data';
        if(data === 'data'){
            resolve(data);
        }else reject(data);
    }, 0);
})

console.log('hi');
promise.then((data) => {
    console.log(data);
    console.log('second!!');
});
