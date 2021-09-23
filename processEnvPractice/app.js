const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

//포트번호 3000
app.set('port', process.env.PORT || 3000);


if(process.env.NODE_ENV === 'development'){
    dotenv.config({ path: path.join(__dirname, 'configs/.env.dev') })
}else if(process.env.NODE_ENV === 'production'){
    dotenv.config({ path: path.join(__dirname, 'configs/.env.pro') })
}

app.use(express.json());
app.use(express.urlencoded({ extended : false}));

app.get('/', (req, res, next) => {
    res.send(process.env.MODE);
})

// 서버 실행
app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번에서 대기 중...!');
})