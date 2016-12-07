rhrApp.controller('settingsController', function settingsController($scope) {
  
  //to be removed in code cleanup
  console.log("settingsController : going in");
  $scope.settingsData = {};

  //flag or validation vars
  $scope.settingsData.isEditClicked = false;

  //data vars
  $scope.settingsData.username = 'sid';
  $scope.settingsData.password = 'password1234';
  $scope.settingsData.userType = 'Doctor';

  $scope.saveClicked = function(currFile) {
    console.log("saveClicked : going in");

    $scope.settingsData.isEditClicked = false;

    console.log("saveClicked : moving out");
  };

  $scope.editClicked = function(currFile) {
    console.log("editClicked : going in");

    $scope.settingsData.isEditClicked = true;

    console.log("editClicked : moving out");
  };

  //to be removed in code cleanup
  console.log("settingsController : moving out");

});