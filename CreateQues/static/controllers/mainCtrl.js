var app = angular.module("myApp", []);

app.service("shareUname", function() {
});

app.controller("loginCtrl", function($scope, $http, $window, shareUname) {
	$scope.validate = function() {
		console.log("Validate func");
		shareUname.uname = $scope.uname1;
		console.log("Username added: " + shareUname.uname);
		// console.log("Angular name: " + $scope.uname1);
		// console.log("Angular pass: " + $scope.pass1);
		$http({
			method: "POST",
			url: "/login/",
			data: {
				name: $scope.uname1,
				passw: $scope.pass1,
			}
		}).then(function(response) {
			console.log("Res: " + response);
			$window.location.href = './MCQ.html';
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
app.controller("QuesCtrl", function($scope, shareUname) {
	$scope.f = function() {
		console.log("Inside ques ctrl");
		console.log(shareUname.uname);
	}
});