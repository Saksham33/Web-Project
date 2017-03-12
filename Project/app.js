var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var config = require('config.json');

app.use(bodyParser.json());

app.use(express.static(__dirname + '/static/'));

Student = require('./models/Student');	// Student.js file for login info in login db
MCQ = require('./models/MCQ');			// MCQ.js file for mcqs in login db

mongoose.connect(config.connectionString);	// config file where mongodb connection path is present
var db = mongoose.connection;
 
// Login
app.post('/login/', function(req, res) {
	var name = req.body.name;
	var passw = req.body.passw;
	Student.checkStudent(name, passw, function(err, student) {
		if(err) {
			throw err;
		}
		if(student != null) {
			console.log("Done!");
			res.send(true);
		}
		else {
			console.log("You are not registered");
			res.send(false);
		}
	});
});

// Register
app.post('/register', function(req, res) {
	var name = req.body.name;
	var passw = req.body.passw;
	var email = req.body.email;

	Student.findUser(name, function(err, student) {
		if(student == null) {
			Student.findEmail(email, function(err, student2) {
				if(student2 == null) {
					Student.addUser(name, passw, email, function(err, student3) {
						if(err) {
							throw err;
						}
						console.log("Registered!");
						res.send("done");
					});
				}
				else {
					res.send("email");
				}
			});
		}
		else {
			res.send("uname");
		}
	});
});

// Delete Account
app.post('/delAccount/', function(req, res) {
	var uname = req.body.userName;
	var pass = req.body.password;
	Student.checkStudent(uname, pass, function(err, student1) {
		if(err) {
			throw err;
		}
		if(student1 == null) {
			res.send("no");
		}
		else {
			Student.delStudent(uname, function(err, student2) {
				if(err) {
					throw err;
				}
				else {
					res.send("yes");
				}
			});
		}
	});
});

// Change Password
app.post('/changePass/', function(req, res) {
	var uname = req.body.userName;
	var oldPass = req.body.currPass;
	var newPass = req.body.nextPass;

	Student.checkStudent(uname, oldPass, function(err, student1) {
		if(err) {
			throw err;
		}
		if(student1 == null) {
			res.send("no");
		}
		else {
			Student.updatePass(uname, oldPass, newPass, function(err, student2) {
				if(err) {
					throw err;
				}
				else {
					res.send("yes");
				}
			});
		}
	});
});

// MCQs
app.post('/addQues/', function(req, res) {
	var ques = req.body.question;
	var options = req.body.options;
	var ans = req.body.answer;
	var topic = req.body.topic;

	MCQ.addQues(ques, ans, options, topic, function(err, resp) {
		if(err) {
			throw err;
		}
		console.log("Added the question");
		res.send("YES");
	});
});

// Delete Questions
app.post('/delQues/', function(req, res) {
	var quesArr = req.body.quesArr;
	for(i in quesArr) {
		MCQ.delQuestion(quesArr[i], function(err, resp) {
			if(err) {
				throw err;
			}
		});
	}
	res.send("Done");
});

app.get('/stack/', function(req, res) {
	var topic = "Stack";
	MCQ.getStackQues(topic, function(err, ques) {
		if(err) {
			throw err;
		}
		res.send(ques);
	});
});

app.get('/queue/', function(req, res) {
	var topic = "Queue";
	MCQ.getStackQues(topic, function(err, ques) {
		if(err) {
			throw err;
		}
		res.send(ques);
	});
});

app.get('/tree/', function(req, res) {
	var topic = "Trees";
	MCQ.getStackQues(topic, function(err, ques) {
		if(err) {
			throw err;
		}
		res.send(ques);
	});
});

app.get('/graph/', function(req, res) {
	var topic = "Graph";
	MCQ.getStackQues(topic, function(err, ques) {
		if(err) {
			throw err;
		}
		res.send(ques);
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
