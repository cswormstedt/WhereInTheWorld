var mongoose = require('mongoose');

var UserSChema = new mongoose.Schema({
	username: String,
	password: String,
	friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	places: [{type: mongoose.Schema.Types.ObjectId, ref: 'Place'}]
});

module.exports = mongoose.model('User', UserSChema);