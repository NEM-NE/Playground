const { DBEvent } = require("./eventHandler.js");

// DBEvent.emit('getUserData');

// DBEvent.emit('disconnectDB');

new Promise(resolve => {
    const user = {
        name : 'sungBin',
        age : 23,
    }
    setTimeout(() => {
        DBEvent.emit('getNewUser', user);
        resolve()
    }, 3000)
})
    .then(() => {
        return new Promise(resolve => {
            setTimeout(() =>{
                DBEvent.emit('disconnectNewDB');
            }, 3000)
        })
    })
    .then(() => {
        console.log(`disconnect!!`);
    })