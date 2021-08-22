const express = require('express');
const User = require('../models/users');

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const users = await User.findAll();
        res.render('sequelize', {users});
    } catch (error) {
        console.log(error);
        next(err);
    }
})

module.exports = router;