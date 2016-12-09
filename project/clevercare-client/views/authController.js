rhrApp.controller('authController',[ '$scope','$rootScope', '$location', function authController($scope,$rootScope,$location){

//to be removed in code cleanup
	console.log("authController : going in");

	$rootScope.usertype = "";
    $scope.user = {username: '', password: ''};

	$scope.login = function(){

		console.log("Entered Login function");
		console.log($scope.user.username);
		console.log($scope.user.password);
		$rootScope.usertype = "nurse";
		$location.path('/dashboard');
		$location.replace();
	};
}]);	