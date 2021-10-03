// Ex1
console.log('start!')

console.log('first');

setTimeout(() => {
    console.log('second!')
}, 0);

console.log('thrid');

// Ex2
function sendData(cb){
    setTimeout(() => {
        const result = 'success';
        cb(result);
    }, 0);
}

function parseData(data, cb) {
    setTimeout(() => {
        const result = data + '1';
        cb(result);
    }, 0);
}

function getData(cb) {
    setTimeout(() => {
        const result = 'result';
        cb(result);
    }, 0);
}
 
getData((result) => {
    let tableData = result;
    console.log(tableData);
    parseData(tableData, (result) => {
        tableData = result;
        console.log(tableData);
        sendData((result) => {
            console.log(result);
        });
    });
});