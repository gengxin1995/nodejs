var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');

var routes = require('./routes');
var photos = require('./routes/photos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//指定图片上传目的地址
app.set('photos', path.join(__dirname, 'public/photos'))

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var multipartMiddleware = multipart();

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', photos.list);
app.get('/upload', photos.form);
app.post('/upload',multipartMiddleware, photos.submit(app.get('photos')));
app.get('/photo/:id/download', photos.download(app.get('photos')));

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
