var mongoose = require('mongoose');
var studentSchema = mongoose.Schema({
	name:{
		type: String
	},
	password:{
		type: String
	},
	email:{
		type: String
	}
});
var Student = module.exports = mongoose.model('logindb', studentSchema, 'Student');	// db, schema, collection

module.exports.checkStudent = function(name, password, callback) {
	var query = {name: name, password: password};
	Student.findOne(query, callback);
}

module.exports.addUser = function(name, password, email, callback) {
	var query = {name: name, password: password, email: email};
	Student.create(query, callback);
}

// module.exports.getStudent = function(callback, limit){	// callback is function from app.js, limit is second parameter(not passed here)
// 	Student.find(callback).limit(limit);
// }

// module.exports.getStudentById = function(id , callback){	// id is first param, callback is the function
// 	Student.findById(id, callback);
// }

// module.exports.getStudentByName = function(name , callback){
// 	var query = {name: name};
// 	Student.findOne(query, callback);
// }

// module.exports.addStudent = function(student, callback){
// 	Student.create(student, callback);
// }


// module.exports.updateStudent = function(id, student, callback){
// 	var query = {_id: id};
// 	var update = {
// 		name: student.name
// 	}
// 	Student.findOneAndUpdate(query, update, callback);
// }

// module.exports.deleteStudent = function(id, callback){
// 	var query = {_id: id};
	
// 	Student.remove(query, callback);
// }