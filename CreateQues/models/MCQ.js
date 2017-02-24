var mongoose = require('mongoose');
var quesSchema = mongoose.Schema({
	question:{
		type: String
	},
	answer:{
		type: String
	},
	options:{
		type: [String]
	}
});

var MCQ = module.exports = mongoose.model('logindb2', quesSchema, 'MCQ');

module.exports.addQues = function(question, answer, options, callback) {
	var query = {question: question, answer: answer, options: options};
	MCQ.create(query, callback);
}

module.exports.getStackQues = function(callback, limit) {
	MCQ.find(callback).limit(limit);
}