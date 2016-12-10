rhrApp.controller('adduserController', function adduserController($scope,$http, $location) {

//to be removed in code cleanup
    $scope.user = {};
    $scope.user.usertype = sessionStorage.getItem("addtype");
    $scope.usertype = sessionStorage.getItem("usertype");
    var url;
    if (!sessionStorage.getItem("usertype")) {
        $location.path('/login');
        $location.replace();
    }
    if ("admin" == $scope.usertype) {
        $scope.addUser = function () {

            var d = {
                firstname: $scope.user.firstName,
                lastname: $scope.user.lastName,
                address: $scope.user.address,
                email: $scope.user.email,
                phone: $scope.user.phone,
                gender: $scope.user.gender,
                password: $scope.user.password
            }
            if ($scope.user.usertype === "nurse") {
                url = "/addNurse";
            }
            if ($scope.user.usertype === "doctor") {
                url = "/addDoctor";
                d.speciality = $scope.user.speciality
            }

            $http.post(url, d)
                .success(function (data) {
                    if (data) {
                        $location.path('/dashboard');
                        $location.replace();
                    }
                })
                .error(function (data) {

                });
        }
    }


});
