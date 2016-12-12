rhrApp.controller('authController', function authController($scope, $rootScope, $location, $http) {

//to be removed in code cleanup
    $rootScope.showNavbar = false;
    $scope.isNotMatch = false;
    $scope.user = {};
    if (sessionStorage.getItem("usertype")) {
        $rootScope.showNavbar = true;
        $location.path('/dashboard');
        $location.replace();
    } else {
            $scope.login = function () {
                var username = $scope.user.username;
                var password = $scope.user.password;

                var regexPattern = /script\b[^>]*>([\s\S]*?)/gim;

                var isScript = regexPattern.test(username) || regexPattern.test(password);
                if(!isScript){
                var d = {email: username, password: password};
                $http.post('/signin', d)
                    .success(function (data) {

                        if (data.success) {
                            $scope.isNotMatch = false;
                            $rootScope.usertype = data.usertype;
                            $rootScope.userId = data.userId;
                            $rootScope.showNavbar = true;
                            sessionStorage.setItem("usertype", data.usertype);
                            sessionStorage.setItem("userId", data.userId);
                            sessionStorage.setItem("tutorials", JSON.stringify(data.videos));
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
                }

            };


    }

});