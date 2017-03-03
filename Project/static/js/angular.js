var app = angular.module("myRoute", ['ngRoute', 'ngCookies']);

app.config(function($routeProvider) {
	$routeProvider
	.when("/Stacks", {
		templateUrl: "stack.html",
	})
	.when("/Queues", {
		templateUrl: "queue.html",
	})
	.when("/Trees", {
		templateUrl: "tree.html",
	})
	.when("/Graphs", {
		templateUrl: "graph.html",
	})
	.otherwise("/", {
	});
});

app.controller("setActive", function($scope, $cookies, $window, $http) {
	if($cookies.get('login') == 'false') {
		alert('Please login to continue');
		$window.location.href='./index.html';
	}

	$scope.check = window.location.hash.substr(1);
	$scope.myText = $cookies.get('myUname');

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

// Controller to display questions from backend
app.controller('quesController', function($scope, $http) {

	// Give names to dynamically added radio buttons
	var index = 0;
	$scope.getName = function() {
		var radName = 'mcq'+index;
		index += 1;
		return radName;
	}

	var index1 = 0;
	$scope.getId = function() {
		var myId = new Array();
		myId.push('right'+index1);
		myId.push('wrong'+index1);
		index1 += 1;
		return myId;
	}

	$scope.answers = new Array();
	// $scope.answers.push('Stack'); // Static for stack. To be removed later

	$scope.loadData = function(myUrl) {
		$http({
			method: "GET",
			url: myUrl,	// url: "/stack/"
		}).then(function(response) {
			$scope.arr = response.data;
			for(x in $scope.arr) {
				// console.log("Question: " + $scope.arr[x].question);
				$scope.answers.push($scope.arr[x].answer);
			}
			console.log("Answers: " + $scope.answers);
		});
	};

	// Check which buttons are selected
	$scope.checkAns = function() {
		var checkedAns = new Array();
		for(i = 0; i < index; i++) {
			var x = $("input[name=mcq"+i+"]:radio:checked").val();
			console.log('Selected ' + x);
			if(x != null) {
				checkedAns.push(x);
			}
		}

		// Count no of correct answers
		var correct = 0;
		for(i = 0; i < checkedAns.length; i++) {
			if(checkedAns[i] == $scope.answers[i]) {
				correct += 1;
				console.log(checkedAns[i]);
			}
		}
		if(checkedAns.length != $scope.answers.length) {
			swal(
		  		"Check Again!",
		  		"Please answer all the questions!",
		  		"warning"
			)
			return;
		}
		else {
			if(correct == $scope.answers.length) {
				swal(
			  		"Good job!",
			  		"You've got all the answers correct!",
			  		"success"
				)
			}
			else {
				swal(
			  		"Try Again!",
			  		"You've got "+correct+" answers correct!",
			  		"error"
				)
			}
		}
		$(".right").css('display', 'inline');
		console.log("Correct Answers: " + correct);
	}

	$scope.getClass = function(op1, op2) {
		// console.log('Op1 & Op2 ' + op1 + " " + op2);
		if(op1 == op2)
			return "right";
		else
			return "right1";
	}
});