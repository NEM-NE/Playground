const express = require('express');
const User = require('../models/users');
const Comment = require('../models/comments');

const router = express.Router();

// 기본적으로 /users에서 라우트가 되기 때문에 users.js에서 라우터 경로 지정 같은 경우 /users를 제외한다.
router.route('/')
    .get(async (req, res, next) => {
        try {
            const users = await User.findAll();
            res.json(users);  // users 객체를 JSON.Stringfy로 변환하여 응답한다.
        } catch (error) {
            console.log(error);
            next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            const user = await User.create({
                name : req.body.name,
                age: req.body.age,
                married: req.body.married,
            })   
            console.log(user);
            res.status(201).json(user);
        } catch (error) {
            console.log(error);
            next(error);
        }
    });

router.get('/:id/comments', async (req, res, next) => {
    try {
        const comments = await Comment.findAll({
            include: {
                model: User,
                where: {id: req.params.id },
            }
        });
        res.json(comments);
    } catch (error) {
        console.log(error);
        next(error);
    }
})


module.exports = router;