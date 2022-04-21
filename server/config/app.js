const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const session = require('express-session');
const flash = require('connect-flash');

// Database setup
const DatabaseConnection = require('./db');
DatabaseConnection();

// Initialize exporess
const app = express();

// View engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

app.use(cors());

// Setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// Initialize passport
let passport = require('./passport');
passport(app);

//routing
const indexRouter = require('../routes/index.routes');
const userRouter = require('../routes/user.routes');
const alertRouter = require('../routes/alert.routes');
const MLRouter = require('../routes/ml.routes');
const motivationRouter = require('../routes/motivation.routes');
const vitalsRouter = require('../routes/vitals.routes');

app.use('/api/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/alert', alertRouter);
app.use('/api/ml', MLRouter);
app.use('/api/motivation', motivationRouter);
app.use('/api/vitals', vitalsRouter);

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