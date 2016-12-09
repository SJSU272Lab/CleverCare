rhrApp.controller('reviewController', ["$scope", '$mdDialog', function($scope, $mdDialog) {
  
  //to be removed in code cleanup
  console.log("reviewController : going in");

  $scope.reviewScreen = {};
  $scope.reviewScreen.searchTerm = "";

  $scope.reviewScreen.gender = 'Male';
  $scope.reviewScreen.ageCategory = 'Adult';
  $scope.reviewScreen.raceSelected = 'Asian';
  $scope.reviewScreen.admissionSourceSelected = 'Transfer from hospital';
  $scope.reviewScreen.admissionTypeSelected = 'admissionType1';
  $scope.reviewScreen.insulinSelected = 'Down';
  $scope.reviewScreen.diabetesMed = 'Yes';
  $scope.reviewScreen.dischargeDispositionSelected = 'Discharged/transfered';
  $scope.reviewScreen.medicalSpecialitySelected = 'Emergency/trauma';
  $scope.reviewScreen.payerCodeSelected = 'payerCode1';
  $scope.reviewScreen.predictionPercent = 65;

  $scope.percentfilter = function(y, data){return $scope.reviewScreen.predictionPercent + '%';}
  
  $scope.reviewScreen.chart1Data = [
            {label: 'Result', value: $scope.reviewScreen.predictionPercent },
            {label: 'Result', value: (100 - $scope.reviewScreen.predictionPercent) }];



  //to be removed in code cleanup
  console.log("reviewController : moving out");


  $scope.scheduleFollowUpClicked = function() {
      console.log("scheduleFollowUpClicked : going in");

      

      console.log("scheduleFollowUpClicked : moving out");
  };

  $scope.doneClicked = function(id) {
      console.log("doneClicked : going in");

      
      console.log("doneClicked : moving out");
  };


  

}]);
