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
	},
	topic:{
		type: String
	}
});

var MCQ = module.exports = mongoose.model('logindb2', quesSchema, 'MCQ');

module.exports.addQues = function(question, answer, options, topic, callback) {
	var query = {question: question, answer: answer, options: options, topic: topic};
	MCQ.create(query, callback);
}

module.exports.getStackQues = function(topic, callback) {
	var query = {topic: topic};
	MCQ.find(query, callback);
}

module.exports.delQuestion = function(question, callback) {
	var query = {question: question};
	MCQ.remove(query, callback);
}