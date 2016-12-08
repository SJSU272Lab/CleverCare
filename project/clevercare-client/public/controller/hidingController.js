rhrApp.controller('hidingController', ['$scope', '$rootScope', function hidingController($scope, $rootScope) {
    //to be removed in code cleanup
    console.log("hidingController");

    $rootScope.showNavbar = false;
    /*
     funtion{\\call service
     // returns true
     //$scope.userType= "user logged in "}
     else
     //error msg
     */
    if (sessionStorage.getItem("usertype")) {
        $rootScope.showNavbar = true;
    }
    else {
        $rootScope.showNavbar = false;
    }

    //to be removed in code cleanup
    console.log("hidingController : moving out");
}]);