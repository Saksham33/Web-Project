var mongoose = require('mongoose');
var testSchema = mongoose.Schema({
	test: {
		type: [String]
	}
});

var McqTests = module.exports = mongoose.model('testModel', testSchema, 'McqTests');

module.exports.findTest = function(test, callback) {
	McqTests.find({test: test}, callback);
}

module.exports.addNewTest = function(test, callback) {
	McqTests.update({id: "1"}, {$push: {test: test}}, {upsert: true}, callback);
}