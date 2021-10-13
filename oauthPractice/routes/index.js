var express = require('express');
var router = express.Router();

const GITHUB_ID = '71284019c431dc473c57';
const GITHUB_SECRET = 'd6445a0528e3156d55cbe9c0c1d7c2c3c262d808';


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/github/callback', function(req, res, next) {
  
});

module.exports = router;
