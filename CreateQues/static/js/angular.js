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
	$scope.loadData = function(myUrl) {
		$http({
			method: "GET",
			url: myUrl,	// url: "/stack/"
		}).then(function(response) {
			$scope.arr = response.data;
			for(x in $scope.arr)
				console.log("Question: " + $scope.arr[x].question);
		});
	};
});