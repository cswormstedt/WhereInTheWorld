var mongoose = require('mongoose');

var PlaceSChema = new mongoose.Schema({

	latitude: String,
	longitude: String,
	time: String,
});

module.exports = mongoose.model('Place', PlaceSChema);