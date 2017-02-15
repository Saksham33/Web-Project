angular.module("myApp", [])

.controller("selectDifficulty", function($scope) {
	$scope.myButton = "Select Difficulty";
	$scope.selectDiff = function(text) {
		$scope.myButton = text;
	};
})

.controller("selectTopic", function($scope) {
	$scope.setTopic = "Select Topic";
	$scope.selectTop = function(text) {
		$scope.setTopic = text;
	};
})