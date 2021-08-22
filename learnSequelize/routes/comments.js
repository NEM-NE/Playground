const express = require('express');
const User = require('../models/users');
const Comment = require('../models/comments');

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const comment = await Comment.create({
            commenter: req.body.id,
            comment: req.body.comment
        })
        res.status(201).json(comment);
    } catch (error) {
        console.log(error);
        next(error);
    }
})

router.route('/:id')
    .patch(async (req, res, next) => {
        try {
            const comment = await Comment.update({
                comment: req.body.comment
            }, {
                where: { id : req.params.id}
            })

            res.status(201).json(comment);
        } catch (error) {
            console.log(error);
            next(error);
        }
    })
    .delete(async (req, res, next) => {
        try {
            const comment = await Comment.destroy({
                where: {id: req.params.id}
            })
            
            res.status(201).json(comment);
        } catch (error) {
            console.log(error);
            next(error);
        }
    })

module.exports = router;