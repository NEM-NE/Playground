const mongoose = require('mongoose');

const connect = () => {
    if(process.env.NODE_ENV !== 'production'){
        mongoose.set('debug', true);
    }

    mongoose.connect(`mongodb://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@localhost:27017/admin`, {
        dbName:'nodejs',
        useNewUrlParser: true,
        
    }, (error) => {
        if(error){
            console.error('몽고디비 연결 에러', error);
        }else {
            console.log('몽고디비 연결 성공');
        }
    });
};

mongoose.connection.on('error', (error) => {
    console.error('몽고디비 연결 에러', error);
})

mongoose.connection.on('disconnect', () => {
    console.error('몽고디비 연결 끊어졌습니다.');
    connect();
})

module.exports = connect;