rhrApp.controller('hidingController',  function hidingController($scope, $rootScope,$location,$http) {
    //to be removed in code cleanup


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

    $scope.logout = function () {
        $http.get("/signout")
            .success(function (response) {
               if(response.success){
                   sessionStorage.clear();
                   $location.path('/');
                   $location.replace();
               }
            })
            .error(function (data) {

            });
    };
    //to be removed in code cleanup

});