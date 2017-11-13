var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

//newly added
var mysql = require('mysql');
var connection = require('express-myconnection');

var cors = require('cors');

var app = express();
var server = require("http").Server(app);
var io = require("socket.io").listen(server);

//create MySQL Connection
/*app.use(connection(mysql, {
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'pricingrequest'
}, 'request'));*/

app.use(connection(mysql, {
	host: 'gator3060.hostgator.com',
	user: 'nuvzsysa_verify',
	password: 'wrF*1Lkfng0h',
	database: 'nuvzsysa_wellryde_broker_verification'
}, 'request'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use(cors());
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
  //res.setHeader('Access-Control-Allow-Origin', '*');
  //next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');

  //res.header("Access-Control-Allow-Origin", "*");
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //next();
});

module.exports = app;
