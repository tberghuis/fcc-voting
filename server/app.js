var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
require('dotenv').config();

// TODO put db url in dotenv
require('./connectdb').connect('localhost:27017/fcc-voting-app');

var app = express();

app.use(logger('dev'));
// why doesn't example use this
// sets up extra middleware for returning json i guess
app.use(bodyParser.json());
// ???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// replace below with sending static react app
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler

// i should be crashing the app in dev mode and spitting out line number.

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);



  console.log("xxxdo i get here");

  //res.render('error');

  res.status(500).json({
    title: 'An error occurred',
    error: err
  });
});

module.exports = app;
