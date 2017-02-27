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

app.controller("setActive", function($scope, $cookies) {
	$scope.check = window.location.hash.substr(1);
	$scope.myText = $cookies.get('myUname');
});

// Controller to display questions from backend
app.controller('quesController', function($scope, $http) {

	// Give names to dynamically added radio buttons
	var index = 0;
	$scope.getName = function() {
		index += 1;
		var radName = 'mcq'+index;
		return radName;
	}

	$scope.answers = new Array();
	$scope.answers.push('Stack'); // Static for stack. To be removed later

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
		for(i = 0; i <= index; i++) {
			var x = $("input[name=mcq"+i+"]:radio:checked").val();
			// console.log("x = " + x);
			checkedAns.push(x);
		}

		// Count no of correct answers
		var correct = 0;
		for(i = 0; i < checkedAns.length; i++) {
			if(checkedAns[i] == $scope.answers[i]) {
				correct += 1;
				console.log(checkedAns[i]);
			}
		}
		console.log("Correct Answers: " + correct);
	}
});