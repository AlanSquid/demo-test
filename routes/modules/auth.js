var express = require('express');
var router = express.Router();
const passport = require('passport');
const authController = require('../../controllers/auth-controller');
const userController = require('../../controllers/user-controller');
const authHelper = require('../../helpers/auth-helper');

/* GET users listing. */
router.get('/login', authController.getLoginPage);

// 登入
router.post(
  '/login',
  passport.authenticate('local', {
    failureRedirect: '/auth/login',
  }),
  (req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = authHelper.getUser(req);
    next();
  },
  userController.getUserPage
);

// 登出
router.post('/logout', authController.logout);

module.exports = router;
