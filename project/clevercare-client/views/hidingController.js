rhrApp.controller('hidingController',['$scope','$rootScope', function hidingController($scope,$rootScope) {
 //to be removed in code cleanup
 console.log("hidingController");
 
$scope.hideNavbar = true;
console.log("Assigning usertype to root scope");
$scope.usertype = $rootScope.usertype;
/*
funtion{\\call service
		// returns true 
			//$scope.userType= "user logged in "}
		else
			//error msg
		*/
if($scope.usertype == "")
{
	$scope.hideNavbar = true;
	console.log("Hiding navbar as user is NOT present");
}
else
{
	$scope.hideNavbar = false;
	console.log("Showing Navebar as user is present");	
}

 //to be removed in code cleanup
  console.log("hidingController : moving out");
}]);