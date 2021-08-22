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

// 기본 미들웨어 셋팅

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
    res.render('error');
})

// 서버 작동 시작

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번에서 대기 중...!');
})