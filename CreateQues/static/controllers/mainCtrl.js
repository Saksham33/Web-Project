var app = angular.module("myApp", []);

app.controller("loginCtrl", function($scope, $http, $window) {
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
			console.log("Res: " + response);
			$window.location.href = './ip.html';
		});
	};

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
		});
	};
});

// MCQ page ctrl
app.controller("QuesCtrl", function($scope, $http) {

	$scope.setTopic = "Select Topic";
	$scope.selectTop = function(text) {
		$scope.setTopic = text;
	};
	$scope.addQuestion = function() {
		console.log("Add ques function");

		var question = $("#t1").val().trim();
		if(question == "") {
			$("#emptyQues").css('display','inline');
			return;
		}
		else {
			$("#emptyQues").css('display','none');
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
		else {
			$("#emptyOptions").css('display', 'none');
		}

		if(answer == null) {
			$("#emptyAnswer").css('display', 'block');
			return;
		}
		else {
			$("#emptyAnswer").css('display', 'none');
		}
		if($scope.setTopic == "Select Topic") {
			$("#emptyTopic").css('display', 'block');
			return;
		}
		else {
			$("#emptyTopic").css('display', 'none');	
		}
		console.log(question);
		console.log(optionsArray);
		console.log(answer);
		console.log($scope.setTopic);
		var form = document.getElementById("mcq_form");
		form.reset();
		$("#options").children().remove();
		$scope.setTopic = "Select Topic";

		// http request
		$http({
			method: "POST",
			url: "/addQues/",
			data: {
				question: question,
				answer: answer,
				options: optionsArray,
			}
		}).then(function(response) {
			console.log("Response: " + response);
		});
	};
});

// Stack controller
app.controller('stackController', function($scope, $http) {
	$scope.loadData = function() {
		$http({
			method: "GET",
			url: "/stack/",
		}).then(function(response) {
			console.log("Question: " + response.data[0].question);
		});
	};
});