var app = angular.module("myApp", ['ngCookies']);

app.controller("loginCtrl", function($scope, $http, $window, $cookies) {
	
	var masterPass = "admin";
	// Login
	$scope.validate = function() {
		console.log("Validate func");

		$http({
			method: "POST",
			url: "/login/",
			data: {
				name: $scope.uname1,
				passw: $scope.pass1,
			}
		}).then(function(response) {
			var flag = response.data;
			console.log("Res: " + flag);

			if(flag == false) {
				console.log("Invalid login");
				$("#invalidLogin").css("display", "block");
				return;
			}
			else {
				$cookies.put('myUname', $scope.uname1);
				$cookies.put('login', 'true');
				if($scope.pass1 == masterPass)
					$cookies.put('teacher', 'true');
				else
					$cookies.put('teacher', 'false');
				$window.location.href = './Main.html';
			}
		});
	};

	// Register
	$scope.add = function() {
		console.log("Register function");	// uname2 email2 pass2 pass3

		if($scope.pass2 != $scope.pass3) {
			console.log("Passwords don't match!");
			return;
		}

		$http({
			method: "POST",
			url: "/register/",
			data: {
				name: $scope.uname2,
				email: $scope.email2,
				passw: $scope.pass2,
			}
		}).then(function(response) {
			var result = response.data;
			console.log("Result: " + result);
			if(result == "uname") {
				$("#invalidUser").css("display", "block");
				return;
			}
			else {
				$("#invalidUser").css("display", "none");
			}

			if(result == "email") {
				$("#invalidEmail").css("display", "block");
				return;
			}
			else {
				$("#invalidEmail").css("display", "none");
			}

			if(result == "done") {
				console.log("Registered!");
				$("#registered").css("display", "block");
				setTimeout(backToLogin, 2000);
			}
			else {
				$("#registered").css("display", "none");
			}

		});
	};
});

// Main page controller
// app.controller("mainPageCtrl", function($scope, $http, $cookies, $window) {
// 	if($cookies.get('login') == 'false') {
// 		alert('Please login to continue');
// 		$window.location.href='./index.html';
// 	}

// 	$scope.myText = $cookies.get('myUname');

// 	$scope.checkTeacher = function() {
// 		if($cookies.get('teacher') == "true")
// 			return true;
// 		else
// 			return false;
// 	}

// 	$scope.delAccount = function() {
// 		// http request to delete account
// 		$("#passMismatch").css('display', 'none');
// 		$("#invPass").css('display', 'none');

// 		var pass1 = $scope.delPass1;
// 		var pass2 = $scope.delPass2;

// 		if(pass1 == pass2) {
// 			$http({
// 				method: "POST",
// 				url: "/delAccount/",
// 				data: {
// 					userName: $cookies.get('myUname'),
// 					password: pass1,
// 				}
// 			}).then(function(response) {
// 				if(response.data == "yes") {
// 					$window.location.href='./index.html';
// 				}
// 				else {
// 					$("#invPass").css('display', 'block');
// 				}
// 			});
// 		}
// 		else {
// 			$("#passMismatch").css('display', 'block');
// 		}
// 	}

// 	$scope.changePass = function() {
// 		$("#passMismatch2").css('display', 'none');
// 		$("#passMatch").css('display', 'none');

// 		var oldPass = $scope.changePass1;
// 		var newPass = $scope.changePass2;

// 		$http({
// 			method: "POST",
// 			url: "/changePass/",
// 			data: {
// 				userName: $cookies.get('myUname'),
// 				currPass: oldPass,
// 				nextPass: newPass,
// 			}
// 		}).then(function(response) {
// 			if(response.data == "no") {
// 				$("#passMismatch2").css('display', 'block');
// 			}
// 			else {
// 				$("#passMatch").css('display', 'block');
// 			}
// 		});
// 	}

// 	$scope.logout = function() {
// 		$cookies.put('login', 'false');
// 	 	$window.location.href='./index.html';
// 	}
// });


// MCQ page ctrl
app.controller("QuesCtrl", function($scope, $http, $cookies, $window) {
	if($cookies.get('login') == 'false') {
		alert('Please login to continue');
		$window.location.href='./index.html';
	}

	$scope.setTopic = "Select Topic";
	$scope.selectTop = function(text) {
		$scope.setTopic = text;
	};

	$scope.addQuestion = function() {
		console.log("Add ques function");

		// Clear every error message first
		$("#emptyQues").css('display','none');
		$("#emptyOptions").css('display', 'none');
		$("#emptyAnswer").css('display', 'none');
		$("#emptyTopic").css('display', 'none');

		var testPage = false;
		// Test part won't exist for create question page but it will be there for create test page.
		if($("#emptyTest").length != 0) {
			testPage = true;
			$("#emptyTest").css('display', 'none');
			var myTest = $("#tName").val().trim();
			if(myTest == "") {
				$("#emptyTest").css('display', 'inline');
				return;
			}
		}	

		var question = $("#t1").val().trim();
		if(question == "") {
			$("#emptyQues").css('display','inline');
			return;
		}

		var optionsArray = new Array();
		var answer = $("input[name=mcq]:checked").val();
		$("#options").find("span").each(function() {
			optionsArray.push($(this).text());
		});

		if(optionsArray.length < 2) {
			$("#emptyOptions").css('display', 'block');
			return;
		}

		if(answer == null) {
			$("#emptyAnswer").css('display', 'block');
			return;
		}

		if($scope.setTopic == "Select Topic") {
			$("#emptyTopic").css('display', 'block');
			return;
		}

		console.log(question);
		console.log(optionsArray);
		console.log(answer);
		console.log($scope.setTopic);

		// http request
		var testName;
		if(testPage == true) {
			testName = $("#tName").val().trim();
		}
		else {
			testName = null;
		}
		$http({
			method: "POST",
			url: "/addQues/",
			data: {
				question: question,
				answer: answer,
				options: optionsArray,
				topic: $scope.setTopic,
				test : testName,
			}
		}).then(function(response) {
			console.log("Response: " + response);
		});

		// Reset everything
		var form = document.getElementById("mcq_form");
		form.reset();
		$("#options").children().remove();
		$scope.setTopic = "Select Topic";

		swal({
			title: '<font color="#5cb85c">Success!</font>',
		  	text: 'You successfully created the question!',
		  	timer: 2000
			}).then(
		  	function () {},
		  	// handling the promise rejection
		  	function (dismiss) {
		    	if (dismiss === 'timer') {
		    		console.log('Error in creating question')
		    	}
		  	}
		)

		if(testPage == true) {
			$scope.showTestQues();
		}
	};

	// Add new test to test collection
	$scope.addNewTest = function() {
		var myTest = $("#tName").val().trim();
		$http({
			method: "POST",
			url: "/addNewTest",
			data: {
				test: myTest
			}
		}).then(function(response) {
			$window.location.href="./Main.html";
		});
	}

	// Show all questions in sidebar
	$scope.sidebarQues = function() {
		$http({
			method: "POST",
			url: "/sidebarQues"
		}).then(function(response) {
			$scope.sideArr = response.data;
			// for(x in $scope.sideArr)
			// 	console.log($scope.sideArr[x].question);
		});
	}

	// Give names to checkboxes
	var index = 0;
	$scope.getName = function() {
		var chName = 'mcq'+index;
		index += 1;
		return chName;
	}

	// Show all selected questions for test
	$scope.showTestQues = function()
	{
		var sideSelectArr = new Array();
		for(i = 0; i < index; i++) {
			var x = $("input[name=mcq"+i+"]:checkbox:checked").val();
			if(x)
				sideSelectArr.push(x);
		}
		var testName = $("#tName").val().trim();
		$http({
			method: "POST",
			url: "/testQues",
			data: {
				questions: sideSelectArr,
				test: testName,
			}
		}).then(function(response) {
			$scope.testQuesArr = response.data;
			// for(x in $scope.testQuesArr)
			//  	console.log($scope.testQuesArr[x].question);
		});
	}

	// Remove questions from current test
	removeTestQues = function(x) {
		var myQues = $(x).parent().find('span').text();
		var myTest = $("#tName").val().trim();
		console.log(myQues);

		$http({
			method: "POST",
			url: "/delTestQues",
			data: {
				ques: myQues,
				test: myTest
			}
		}).then(function(response) {
			console.log(response.data);
		});

		$(x).parent().remove();
	}

	if($cookies.get('login') == 'false') {
		alert('Please login to continue');
		$window.location.href='./index.html';
	}

	$scope.myText = $cookies.get('myUname');

	$scope.checkTeacher = function() {
		if($cookies.get('teacher') == "true")
			return true;
		else
			return false;
	}

	$scope.delAccount = function() {
		// http request to delete account
		$("#passMismatch").css('display', 'none');
		$("#invPass").css('display', 'none');

		var pass1 = $scope.delPass1;
		var pass2 = $scope.delPass2;

		if(pass1 == pass2) {
			$http({
				method: "POST",
				url: "/delAccount/",
				data: {
					userName: $cookies.get('myUname'),
					password: pass1,
				}
			}).then(function(response) {
				if(response.data == "yes") {
					$window.location.href='./index.html';
				}
				else {
					$("#invPass").css('display', 'block');
				}
			});
		}
		else {
			$("#passMismatch").css('display', 'block');
		}
		// window.location.href = "./Quiz.html#/check"
	}

	$scope.changePass = function() {
		$("#passMismatch2").css('display', 'none');
		$("#passMatch").css('display', 'none');

		var oldPass = $scope.changePass1;
		var newPass = $scope.changePass2;

		$http({
			method: "POST",
			url: "/changePass/",
			data: {
				userName: $cookies.get('myUname'),
				currPass: oldPass,
				nextPass: newPass,
			}
		}).then(function(response) {
			if(response.data == "no") {
				$("#passMismatch2").css('display', 'block');
			}
			else {
				$("#passMatch").css('display', 'block');
			}
		});
	}

	$scope.logout = function() {
		$cookies.put('login', 'false');
	 	$window.location.href='./index.html';
	}
});