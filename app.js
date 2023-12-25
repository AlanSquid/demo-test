var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const usePassport = require('./config/passport')
const session = require('express-session')
const routes = require('./routes')
const authHelper = require('./helpers/auth-helper');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session設定
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))

// 將app作為參數提供給passport設定，這行要在session設定後面
usePassport(app)

// res.locals有點類似全域變數，但不是
// 它的作用範圍只在當前請求，通常用來給模板使用
app.use((req, res, next) => {
  // 在模板中使用的話直接拿isAuthenticated、user就可以直接調用
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = authHelper.getUser(req)
  next()
})

app.use(routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
