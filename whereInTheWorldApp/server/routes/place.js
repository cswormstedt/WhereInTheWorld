var express  = require('express');
var router 	 = express.Router();
var Place = require('../models/places');

router.route('/allPlaces')
	.get(function(req, res){

		let query = Place.find();
		query.exec((err, places) => {
        if (err) res.send(err)

          res.json(places);
      })
	})


router.route('/')
	.get(function(req, res){
		if(req.session.isLoggedIn){
				res.render('place', { username: req.session.username});
		} else {
			res.redirect('/');
		}
	})
	.post(function(req, res){
		var newPlace = new Place(req.body);
		
		newPlace.save((err, place) =>{
			if (err){
				res.send(err)
			}
			else {
				res.json({message: "Checked in", place})
			}
		})
	})





module.exports = router;