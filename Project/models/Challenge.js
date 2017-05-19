var mongoose = require('mongoose');
var mySchema = mongoose.Schema({
	challenge:{
		type: String
	},
	statement:{
		type: String
	},
	input:{
		type: String
	},
	output:{
		type: String
	},
	constraints:{
		type: String
	},
	topic:{
		type: String
	},
	tcase:{
		type: [String]
	}
});

var Challenge = module.exports = mongoose.model('logindb3', mySchema, 'Challenge');

module.exports.addNewChall = function(chall, stat, ip, op, constr, topic, tcase, callback) {
	var query = {
		challenge: chall,
		statement: stat,
		input: ip,
		output: op,
		constraints: constr,
		topic: topic,
		tcase: tcase
	};
	Challenge.create(query, callback);
}