var express = require('express');
var router  = express.Router();
var User 	= require('../models/users');
var bcrypt  = require('bcryptjs');


router.get('/login', function(req, res){
	res.render('', {});
});

router.post('/login', function(req, res){
	//first query the database and find the user
	User.findOne({username: req.body.username}, function(err, user){
		//if there is a user then unhash their password
		if(user){

			bcrypt.compare(req.body.password, user.password, function(err, match){
				//this function returns true or false
				if(match === true){
					//set the session and direct to whatever
					req.session.username   = user.username;
					req.session.userId     = user.id;
					req.session.isLoggedIn = true;

					res.redirect('/userHome');
				}
				else{
					//send them a message wrong username or password
					res.render('/login', {message: 'username or password incorrect'})
				}
			});
		}
		//this is for the orignal if
		else {
			res.render('/login', {message: 'username or password was incorrect'})
		}
	});
});

router.post('/register', function(req, res){
	//checking the database to see if there is already a username,
	//that matches req.body.username
	console.log(req.body)
	User.findOne({username: req.body.username}, function(err, user){
		console.log(user, req.body.username, ' this is user from database');
		if(user === null){
			//want to register//create salt and hash
			bcrypt.genSalt(10, function(err, salt){
				//created salt now create hash
				bcrypt.hash(req.body.password, salt, function(err, hash){
					//hash is created need to save use id
					var userDbEntry = {};
					userDbEntry.username = req.body.username;
					userDbEntry.password = hash;

					//now can use model to create entry
					User.create(userDbEntry, function(err, user){
						if(user){
							//if user created, make session
							req.session.username   = user.username;
							req.session.userId 	   = user.id;
							req.session.isLoggedIn = true;

							//redirect to home
							res.redirect('/userHome');
						}
						else{
							res.send('there was an error');
						}
					});
				});
			});
		}
		else{
			//send message that username is taken
			res.render('register', {loginmessage: 'username is taken'})
		}
	});
});


router.get('/logout', function(req, res){
	req.session.destroy(function(err){
		res.redirect('/')
	});
});


module.exports = router;
