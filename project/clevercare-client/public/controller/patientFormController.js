rhrApp.controller('patientFormController', function patientFormController($scope, $mdDialog) {
  
  //to be removed in code cleanup
  console.log("patientFormController : going in");

  $scope.patientFormData = {};

  //dummy data 
  $scope.patientFormData.gender = 'Male';
  $scope.patientFormData.ageCategory = 'Old';

  $scope.patientFormData.raceOptions = ['African American', 'Asian', 'Hispanic'];
  $scope.patientFormData.raceSelected = 'African American';

  $scope.patientFormData.admissionSourceOptions = ['Transfer from hospital', 'admissionSource2', 'admissionSource3'];
  $scope.patientFormData.admissionSourceSelected = 'Transfer from hospital';

  $scope.patientFormData.admissionTypeOptions = ['admissionType1', 'admissionType2', 'admissionType3'];
  $scope.patientFormData.admissionTypeSelected = 'admissionType1';

  $scope.patientFormData.dischargeDispositionOptions = ['Discharged/transfered', 'dischargeDispositionOption2', 'dischargeDispositionOption3'];
  $scope.patientFormData.dischargeDispositionSelected = 'Discharged/transfered';

  $scope.patientFormData.insulinOptions = ['Up', 'Down', 'Stable'];
  $scope.patientFormData.insulinSelected = 'Down';

  $scope.patientFormData.medicalSpecialityOptions = ['Emergency/trauma', 'medicalSpeciality2', 'medicalSpeciality3'];
  $scope.patientFormData.medicalSpecialitySelected = 'Emergency/trauma';

  $scope.patientFormData.payerCodeOptions = ['payerCode1', 'payerCode2', 'payerCode3'];
  $scope.patientFormData.payerCodeSelected = 'payerCode1';

  $scope.patientFormData.predictButton = 'Yes';
  $scope.patientFormData.clearButton = 'Yes';

  $scope.patientFormData.predictionPercent = 65;

  $scope.percentfilter = function(y, data){return $scope.patientFormData.predictionPercent + '%';}

  $scope.patientFormData.chart1Data = [
            {label: 'Result', value: $scope.patientFormData.predictionPercent },
            {label: 'Result', value: (100 - $scope.patientFormData.predictionPercent) }];
  
  //to be removed in code cleanup
  console.log("patientFormController : moving out");

});