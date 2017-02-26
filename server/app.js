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
app.use(bodyParser.json());
// ???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

app.use(express.static('build'));

app.get('/*',function(req, res){
  //res.sendfile(__dirname + '/../client/index.html');
  //res.sendFile('client/index.html');

  // sendfile deprecated use sendFile
  res.sendfile('client/index.html');
});

// shouldnt be reached under normal use
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.status(500).json({
    title: 'An error occurred',
    error: err
  });
});

module.exports = app;
