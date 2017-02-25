var app = angular.module("myRoute", ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
	.when("/Stacks", {
		templateUrl: "stack/stack.html",
	})
	.when("/Queues", {
		templateUrl: "queue/queue.html",
	})
	.when("/Trees", {
		templateUrl: "tree/tree.html",
	})
	.when("/Graphs", {
		templateUrl: "graph/graph.html",
	})
	.otherwise("/", {
	});
});

app.controller("setActive", function($scope) {
	$scope.check = window.location.hash.substr(1);
});