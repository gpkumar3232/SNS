var express = require('express');
var router = express.Router();
const passport = require('passport');
const UsersController = require('../controllers/users.controller');

router.post('/login', UsersController.login);
router.post('/signup', UsersController.signup);
router.get('/users', passport.authenticate('jwt', { session: false }), UsersController.getUsers);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
