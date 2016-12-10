rhrApp.controller('authController', function authController($scope, $rootScope, $location, $http) {

//to be removed in code cleanup
    $rootScope.showNavbar = false;
    $scope.isNotMatch = false;

    if (sessionStorage.getItem("usertype")) {
        $rootScope.showNavbar = true;
        $location.path('/dashboard');
        $location.replace();
    } else {
        $scope.login = function () {
            var d = {email: $scope.user.username, password: $scope.user.password};
            $http.post('/signin', d)
                .success(function (data) {

                    if (data.success) {
                        $scope.isNotMatch = false;
                        $rootScope.usertype = data.usertype;
                        $rootScope.userId = data.userId;
                        $rootScope.showNavbar = true;
                        sessionStorage.setItem("usertype", data.usertype);
                        sessionStorage.setItem("userId", data.userId);
                        $location.path('/dashboard');
                        $location.replace();

                    } else {
                        $scope.isNotMatch = true;
                    }
                })
                .error(function (data) {
                    $scope.isNotMatch = false;
                    $rootScope.showNavbar = false;

                });


        };
    }

});