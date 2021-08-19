const EventEmitter = require('events');

const DBEvent = new EventEmitter();

const getUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const user = {
                name : 'sungBin',
                age : 23,
            }

            resolve(user)
        }, 3000);
    })
}

DBEvent.on('getUserData', () => {  
    getUser()
        .then((user) => {
            console.log(user);
        })
})

DBEvent.on('getNewUser', (user) => {  
    console.log(user);
})

const disconnectDB = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const result = 'disconnect!';
            resolve(result);
        }, 3000);
    })
}

DBEvent.on('disconnectDB', () => {
    disconnectDB()
        .then((result) => console.log(result))
})

DBEvent.on('disconnectNewDB', () => {
    console.log('disconnect');
})

module.exports =  {DBEvent};