var express  = require('express');
var router 	 = express.Router();
var Place = require('../models/places');
var User 	 = require('../models/users');


router.get('/', function(req, res){
	if(req.session.isLoggedIn){
			res.render('userHome', { username: req.session.username});
	} else {
		res.redirect('/');
	}
});



module.exports = router;