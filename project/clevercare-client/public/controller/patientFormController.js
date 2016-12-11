rhrApp.controller('patientFormController', function patientFormController($scope, $http, $location, $mdDialog) {

    //to be removed in code cleanup

    if (!sessionStorage.getItem("usertype")) {
        $location.path('/login');
        $location.replace();
    }

    $scope.followup = JSON.parse(sessionStorage.getItem("followup"));

    console.log($scope.followup);
    $scope.patientFormData = {};

    //dummy data
    $scope.patientFormData.gender = $scope.followup.gender;
    $scope.patientFormData.ageCategory = $scope.followup.ageCategory;

    $scope.patientFormData.admissionTypeOptions = ['Emergency', 'Urgent', 'Elective','New born','Trauma Center'];
    $scope.patientFormData.admissionTypeSelected = $scope.followup.admissionType;

    $scope.patientFormData.insulinOptions = ['No','Up','Down','Steady'];
    $scope.patientFormData.insulinSelected = 'Down';

    $scope.patientFormData.diabetesMed = 'No';

    $scope.patientFormData.tirednessOptions = ['1', '2', '3','4','5'];
    $scope.patientFormData.tirednessSelected = '1';

    $scope.patientFormData.frequentUrinationOptions = ['1', '2', '3','4','5'];
    $scope.patientFormData.frequentUrinationSelected = '1';

    $scope.patientFormData.frequentExerciseOptions = ['1', '2', '3','4','5'];
    $scope.patientFormData.frequentExerciseSelected = '1';

    $scope.patientFormData.frequentBlurryVisionOptions = ['1', '2', '3','4','5'];
    $scope.patientFormData.frequentBlurryVisionSelected = '1';

    $scope.patientFormData.predictButton = 'Yes';
    $scope.patientFormData.clearButton = 'Yes';


    /*$scope.patientFormData.predictionPercent = 65;
    $scope.percentfilter = function (y, data) {
        return $scope.patientFormData.predictionPercent + '%';
    }

    $scope.patientFormData.chart1Data = [
        {label: 'Result', value: $scope.patientFormData.predictionPercent},
        {label: 'Result', value: (100 - $scope.patientFormData.predictionPercent)}];

    //to be removed in code cleanup*/


    $scope.predictClicked = function () {

        var followupId = sessionStorage.getItem("followupId");
        var record = $scope.patientFormData;
        delete record.insulinOptions;
        delete record.admissionTypeOptions;
        delete record.tirednessOptions;
        delete record.frequentUrinationOptions;
        delete record.frequentExerciseOptions;
        delete record.frequentBlurryVisionOptions;
        delete record.predictButton;
        delete record.clearButton;

        var d = {
            followupId: followupId,
            record: record,
            taken_by: sessionStorage.getItem("userId")
        };

        $http.post('/submitFollowup', d)
            .success(function (data) {

                if (data) {
                    $location.path('/dashboard');
                    $location.replace();
                }
            })
            .error(function (data) {
            });

    };

});