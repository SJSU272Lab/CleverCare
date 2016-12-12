rhrApp.controller('settingsController', function settingsController($scope,$http) {

    //to be removed in code cleanup

    $scope.settingsData = {};

    //flag or validation vars
    $scope.settingsData.isEditClicked = false;

    //data vars

    var userId = sessionStorage.getItem("userId");
    $scope.isChanged =  false;
    $scope.isWrong =  false;
    $scope.msg = "";

    $scope.saveClicked = function (currFile) {
        var d = {
            userId:userId,
            oldpwd: $scope.settingsData.oldpwd,
            newpwd: $scope.settingsData.newpwd
        };
        console.log(d);
        $http.post('/changePassword',d)
            .success(function (response) {
                if(response.success){
                    $scope.isChanged =  response.success;
                    $scope.msg = response.message;
                }else{
                    $scope.isWrong =  true;
                    $scope.msg = "Old password doesn't match";
                }
            })
            .error(function (data) {
                $scope.isChanged =  false;
                $scope.msg = "";
            });
        $scope.settingsData.isEditClicked = false;
    };

    $scope.editClicked = function (currFile) {
        $scope.settingsData.isEditClicked = true;
        $scope.isChanged =  false;
        $scope.isWrong =  false;
        $scope.msg = "";

    };

    //to be removed in code cleanup


});