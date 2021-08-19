const multiply = (a, b) => (a * b);

const add = (a, b) => (a + b);

const makeUser = (name, age) => {
    return {
        name : name,
        age : age
    }
}

const throwErr = () => {
    throw new Error('jj');
}

const getName = (callback) => {
    const name = 'Mike';
    setTimeout(() => {
        callback(name);
    }, 3000);
}

const getAge = () => {
    const age = 23;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(age);
        }, 3000)
    })
}

const connectDB = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                name : 'Mike',
                age : 23
            })
        }, 1000)
    })
}

const disconnectDB = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('success')
        }, 1000)
    })
}

module.exports = {multiply, makeUser, add, throwErr, getName, getAge, connectDB, disconnectDB};