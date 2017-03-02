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
			}
			else {
				$("#registered").css("display", "none");
			}

		});
	};
});

// Main page controller
app.controller("mainPageCtrl", function($scope, $http, $cookies, $window) {
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

		// http request
		$http({
			method: "POST",
			url: "/addQues/",
			data: {
				question: question,
				answer: answer,
				options: optionsArray,
				topic: $scope.setTopic,
			}
		}).then(function(response) {
			console.log("Response: " + response);
		});

		// Reset everything
		var form = document.getElementById("mcq_form");
		form.reset();
		$("#options").children().remove();
		$scope.setTopic = "Select Topic";

	};
});

// Stack controller
// app.controller('stackController', function($scope, $http) {
// 	$scope.loadData = function() {
// 		$http({
// 			method: "GET",
// 			url: "/stack/",
// 		}).then(function(response) {
// 			$scope.arr = response.data;
// 			for(x in $scope.arr)
// 				console.log("Question: " + $scope.arr[x].question);
// 		});
// 	};
// });

// Queue controller
// app.controller('queueController', function($scope, $http) {
// 	$scope.loadData = function() {
// 		$http({
// 			method: "GET",
// 			url: "/queue/",
// 		}).then(function(response) {
// 			$scope.arr = response.data;
// 			for(x in $scope.arr)
// 				console.log("Question: " + $scope.arr[x].question);
// 		});
// 	};
// });

// Tree controller
// app.controller('treeController', function($scope, $http) {
// 	$scope.loadData = function() {
// 		$http({
// 			method: "GET",
// 			url: "/tree/",
// 		}).then(function(response) {
// 			$scope.arr = response.data;
// 			for(x in $scope.arr)
// 				console.log("Question: " + $scope.arr[x].question);
// 		});
// 	};
// });

// Graph controller
// app.controller('graphController', function($scope, $http) {
// 	$scope.loadData = function() {
// 		$http({
// 			method: "GET",
// 			url: "/graph/",
// 		}).then(function(response) {
// 			$scope.arr = response.data;
// 			for(x in $scope.arr)
// 				console.log("Question: " + $scope.arr[x].question);
// 		});
// 	};
// });