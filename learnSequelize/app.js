const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const {sequelize} = require('./models/index.js');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');


// 기본 셋팅
const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html'); //  어떤 형식의 파일을 보여줄 것인지 설정한다.

nunjucks.configure('views', {   //폴더 경로를 선택
    express : app,  //app 객체를 연결한다.
    watch : true    //파일이 변경될때 템플릿엔진를 다시 렌더링하는지
});

sequelize.sync({force:false})
    .then(() => {
        console.log('success db connect!');
    })
    .catch((err) => {
        console.log(err);
    })

// 기본 미들웨어 셋팅sdsds

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// 라우터

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

// 에러 처리

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    console.log('실행됭ㅁ1');
    next(error);
})

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err :{};
    res.status(err.status || 500);
    console.log('실행됭ㅁ2');
    /*
        res.render vs res.send vs res.json

        res.render => 설정한 템플릿 엔진을 사용하여 렌더링
        res.send => 다양한 유형의 응답을제공
        res.json => json 응답을 제공
    */
    res.render('error');    // error 파일을 찾아서 렌더링.
})

// 서버 작동 시작

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번에서 대기 중...!');
})