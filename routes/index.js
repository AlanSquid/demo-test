var express = require('express');
var router = express.Router();

// modules引入
const home = require('./modules/home');
const auth = require('./modules/auth');
const users = require('./modules/users');

const { authenticator } = require('../middleware/auth');

/* GET home page. */
router.use('/', home);
router.use('/auth', auth);
router.use('/users', authenticator, users);

module.exports = router;
