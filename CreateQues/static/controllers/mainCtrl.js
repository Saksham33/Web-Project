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

		console.log(question);
		console.log(optionsArray);
		console.log(answer);
		var form = document.getElementById("mcq_form");
		form.reset();
		$("#options").children().remove();

		// http request
	};
});

