rhrApp.controller('settingsController', function settingsController($scope) {
  
  //to be removed in code cleanup

  $scope.settingsData = {};

  //flag or validation vars
  $scope.settingsData.isEditClicked = false;

  //data vars
  $scope.settingsData.username = 'sid';
  $scope.settingsData.password = 'password1234';
  $scope.settingsData.userType = 'Doctor';

  $scope.saveClicked = function(currFile) {


    $scope.settingsData.isEditClicked = false;


  };

  $scope.editClicked = function(currFile) {


    $scope.settingsData.isEditClicked = true;


  };

  //to be removed in code cleanup


});