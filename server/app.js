var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser'); // deprecated!!!
var passport = require('passport');
var session = require('express-session');
// var connect_cache = require('connect-cache');

var app = express();

app.all('*', function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  //res.set('Access-Control-Allow-Credentials', true);
  res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});

var routes = require('./routes/index');
// var users = require('./routes/users');
// var login = require('./routes/login');
var api = require('./routes/api');

app.use(compression());
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
	resave: true,
	saveUninitialized: true,
	secret: 'arvizturotukorfurogep',
	cookie: {secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(connect_cache({rules: [{regex: /.*/, ttl: 60000}]}));


/**
 * Development Settings
 */
if (app.get('env') === 'development') {
	console.log('mode: development');
	// This will change in production since we'll be using the dist folder
	// This covers serving up the index page
	app.use(express.static(path.join(__dirname, '../client/.tmp'), { maxAge: 0 }));
	app.use(express.static(path.join(__dirname, '../client/app'), { maxAge: 0 }));

	// Error Handling
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: err
		});
	});
}

var oneDay = 86400000;

/**
 * Production Settings
 */
if (app.get('env') === 'production') {
	console.log('mode: production');

	// changes it to use the optimized version for production
	app.use(express.static(path.join(__dirname, '../client/dist'), { maxAge: oneDay }));

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {}
		});
	});
}


// app.use('/login', login);
app.use('/api', api);

module.exports = app;
