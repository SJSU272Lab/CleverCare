rhrApp.controller('adduserController', function adduserController($scope) {

//to be removed in code cleanup
console.log("adduserController : going in");

$scope.user = {firstName : '', lastName : '', address : '', phone : '', email : '', gender : '', usertype : '', specialty : '', notes : '', password : ''};

$scope.addUser = function()
{
	console.log("Entered adduser function");

	console.log("Below is the form to be submittted");
	console.log($scope.user.firstName);
	console.log($scope.user.lastName);
	console.log($scope.user.address);
	console.log($scope.user.phone);
	console.log($scope.user.email);
	console.log($scope.user.gender);
	console.log($scope.user.usertype);
	console.log($scope.user.specialty);
	console.log($scope.user.notes);
	console.log($scope.user.password);
		
	console.log("Exiting adduser function");
};

//to be removed in code cleanup
console.log("adduserController : leaving out");

});
