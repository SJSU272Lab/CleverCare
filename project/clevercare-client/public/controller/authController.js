rhrApp.controller('authController', function authController($scope, $rootScope, $location,$http) {

//to be removed in code cleanup
    $rootScope.showNavbar = false;
    $scope.login = function () {

        console.log("login clicked");
        var d = {email: $scope.user.username, password: $scope.user.password};
        $http.post('/signin', d)
            .success(function (data) {
                console.log(data);
                if (data) {
                    $rootScope.usertype = data.usertype;
                    $rootScope.userId = data.userId;
                    $rootScope.showNavbar = true;
                    sessionStorage.setItem("usertype", data.usertype);
                    sessionStorage.setItem("userId", data.userId);
                    $location.path('/dashboard');
                    $location.replace();
                }
            })
            .error(function (data) {
                $rootScope.showNavbar = false;
                console.log(data);
            });


    };
});