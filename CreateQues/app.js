var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config.json');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/static/'));

Student = require('./models/Student');	// Student.js file
mongoose.connect(config.connectionString);	// config file where mongodb connection path is present
var db = mongoose.connection;
 
app.post('/login/', function(req, res) {
	var name = req.body.name;
	var passw = req.body.passw;
	// console.log(name);
	// console.log(passw);
	Student.checkStudent(name, passw, function(err, student) {
		if(err) {
			throw err;
		}
		if(student != null) {
			console.log("Done!");
			res.send(student);
		}
		else {
			console.log("You are not registered");
		}
	});
});

app.post('/register', function(req, res) {
	var name = req.body.name;
	var passw = req.body.passw;
	var email = req.body.email;
	console.log(name);
	console.log(passw);
	console.log(email);

	Student.addUser(name, passw, email, function(err, student) {
		if(err) {
			throw err;
		}
		console.log("Registered!");
	});
});

// app.get('/',function(req, res){
// 	res.send('hello world db path =  '+config.connectionString+ ' ' );

// });

// app.get('/student/', function(req,res){	// When url is /student
// 	console.log("in here");
// 	Student.getStudent(function(err,student){
// 		if(err){
// 			throw err;
// 		}
// 		console.log("in  too");
// 		res.send(student); 
// 	});
// });

// app.post('/student/', function(req,res){	// When url is /student
// 	console.log("in here");
// 	console.log(req.body.myval);
// 	Student.getStudent(function(err,student){
// 		if(err){
// 			throw err;
// 		}
// 		console.log("in  too");
// 		res.send(student); 
// 	});
// });

var server = app.listen('9090', function(){
	//console.log('running on port 9090 now');
	console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});
