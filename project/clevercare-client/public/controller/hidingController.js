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
    if (sessionStorage.getItem("usertype")) {
        $scope.usertype = sessionStorage.getItem("usertype");
    }
    else {
        $rootScope.showNavbar = false;
    }
    $scope.dashboard = "active";
    $scope.logout = function () {
        $scope.dashboard = "";
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
    $scope.dashboardClicked = function(){
        $scope.dashboard = "active";
        $scope.patient = "";
        $scope.setting = "";
    }

    $scope.patientClicked = function(){
        $scope.dashboard = "";
        $scope.patient = "active";
        $scope.setting = "";

    }

    $scope.settingClicked = function(){
        $scope.dashboard = "";
        $scope.patient = "";
        $scope.setting = "active";
    }

});
