var express = require('express');
var passport = require('passport');
var router = express.Router();
var LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use('login', new LocalStrategy(
  function(username, password, done) {
	/* get the username and password from the input arguments of the function */
	console.log('username', username, password);

	if(username === 'test' && password === 'test'){
		return done(null, true, { msg: 'success' });
	} else {
		return done(null, false, { msg: 'Wrong u/p' });
	}

	// query the user from the database
	// don't care the way I query from database, you can use
	// any method to query the user from database
	// User.find( { where: {username: username}} )
	// 	.success(function(user){

	// 		if(!user)
	// 		  // if the user is not exist
	// 		  return done(null, false, {message: "The user is not exist"});
	// 		else if(!hashing.compare(password, user.password))
	// 		  // if password does not match
	// 		  return done(null, false, {message: "Wrong password"});
	// 		else
	// 		  // if everything is OK, return null as the error
	// 		  // and the authenticated user
	// 		  return done(null, user);

	//   	})
	// 	.error(function(err){
	// 		// if command executed with error
	// 		return done(err);
	// 	});
  }
));

router.get('/', function(req, res) {
	if(req.user){
		// already logged in
		res.redirect('/');
	} else {
		// not logged in, show the login form, remember to pass the message
		// for displaying when error happens
		res.json({
			'msg': 'not logged in!'
		});
	}
});

router.post('/', function(req, res, next) {
	console.log("body parsing", req.body);

	// ask passport to authenticate
	passport.authenticate('login', function(err, user, info) {
		console.log('user', user, info)
		if (err) {
			// if error happens
			res.json({
				'msg': err
			});
		}

		if (!user) {
			// if authentication fail, get the error message that we set
			// from previous (info.message) step, assign it into to
			// req.session and redirect to the login page again to display
			req.session.messages = info.message;
			res.json({
				'msg': 'failed'
			});
		}

		// if everything's OK
		req.logIn(user, function(err) {
			if (err) {
				res.json({
					'msg': err
				});
			}

			// set the message
			res.json({
				'msg': 'success'
			});
		});

	})(req, res, next);
});

router.get('/logout', function(req, res, next) {
	if(req.isAuthenticated()){
	  req.logout();
	}
	res.json({
		'msg': 'success'
	});
});
module.exports = router;
