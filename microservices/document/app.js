/**
 * 1. Filename: /home/aditi/final-project/microservices/document/app.js
 * 2. Purpose: Application main entry point, uses document.js for get routes.
 * 3. Dependency: 'Express' module, 'http-errors' module, 'path' module,'cookie-parser' module, 'morgan' module,
 * 4. API: None
 * 5. Author: Aditi Nath
 * 6. Creation date: 05-02-2022
 * 7. Modification date: 16-02-2022
 * 8. How to test: End to end test using "npm run test:e2e"
 * 9. TO DO: i) accomodate different documents. 
 */
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var documentRouter = require('./routes/router');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', documentRouter);
app.set('view engine', 'ejs')

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
});

module.exports = app;
