const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');


const indexRouter = require('./routes');
const userRouter = require('./routes/user');

//default start

dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, 
    },
    name: 'rnbck',
}));

app.listen(app.get('port'), () => {
    console.log(`${app.get('port')}번에서 대기 중`);
}) 

//default end

//  multer start

const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
}catch (error){
    console.log('uploads 폴더가 없어 uploads폴더를 생성합니다.')
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024},
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload',
    upload.fields([{name:'image1'}, {name : 'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    }
);

app.get('/', (req, res, next) => {
    console.log('GET 요청에만 실행')
})

//  multer end

app.use('/', indexRouter);
app.use('/user', userRouter);

app.use((req, res, next) => {
    res.status(404).send('Not Found');
})