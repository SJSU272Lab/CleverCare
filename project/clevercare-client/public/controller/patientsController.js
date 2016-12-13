rhrApp.controller('patientsController', function ($scope, $http, $location, $rootScope, $filter, $mdDialog) {

    //to be removed in code cleanup


    if (!sessionStorage.getItem("usertype")) {
        $location.path('/login');
        $location.replace();
    }
    var url = {};
    $scope.userdata = {};
    $scope.patientScreen = {};
    $scope.patientScreen.searchTerm = "";
    $scope.patientScreen.patientList = [];
    $scope.patientScreen.currPatient = {};

    // $scope.patientScreen.previousChancesData = [{"followup": "1", "percent": 45 }];

    var usertype = sessionStorage.getItem("usertype");
    $scope.userdata.usertype = usertype;
    if ("doctor" == usertype) {
        url.followups = "/listFollowUps/Review";
        url.listFollowupByPatient = "/listFollowUps/Review/Patient/";
    }

    if ("nurse" == usertype) {
        url.followups = "/listFollowUps/";
        url.listFollowupByPatient = "/listFollowUps/Patient/";
    }

    $http.get(url.followups)
        .success(function (response) {
            console.log(response);
            var patientArr = [];
            for (var i = 0; i < response.length; i++) {
                var patient = {
                    'id': response[i]._id,
                    'patientId': response[i].patientId._id,
                    'patientFileId': response[i].patientFileId._id,
                    'doctorId': response[i].doctorId._id,
                    'dischargeNotes': response[i].patientFileId.dischargeNote,
                    'disease': response[i].patientFileId.disease,
                    'age': response[i].patientId.age,
                    'email': response[i].patientId.email,
                    'name': response[i].patientId.firstname + " " + response[i].patientId.lastname,
                    'contactNumber': response[i].patientId.phonenumber,
                    'status': response[i].status,
                    'followUpDueOn': $filter('date')(response[i].dueDate, "MM/dd/yyyy"),
                    'record': response[i].record,
                    'admissionType': response[i].patientFileId.admissionType,
                    'ageCategory': response[i].patientId.ageCategory,
                    'percentage': response[i].percentage,
                    'gender': response[i].patientId.gender
                }
                patientArr.push(patient);
            }
            $scope.patientScreen.patientList = patientArr;
            $scope.patientScreen.patientListBackup = $scope.patientScreen.patientList;
            $scope.patientScreen.currPatient = $scope.patientScreen.patientList[0];

            $http.get(url.listFollowupByPatient + $scope.patientScreen.currPatient.patientId)
                .success(function (response) {

                    $scope.patientScreen.currPatient.files = response;
                    $scope.patientScreen.previousChancesData = [];
                    for (var i = 0; i < $scope.patientScreen.currPatient.files.length; i++) {
                        var obj = {
                            "followup": i + 1 + "",
                            "percent": Number($scope.patientScreen.currPatient.files[i].percentage)
                        }
                        $scope.patientScreen.previousChancesData.push(obj);
                    }
                    console.log($scope.patientScreen.previousChancesData[0]);
                })
                .error(function (data) {

                });
        })
        .error(function (data) {

        });


    //initially keep first record selected


    //to be removed in code cleanup


    $scope.searchClicked = function (currPatient) {

        searchString = $scope.patientScreen.searchTerm;
        var result = [];

        $scope.patientScreen.patientList = $scope.patientScreen.patientListBackup;

        if (searchString == '') {
            result = $scope.patientScreen.patientListBackup;
        } else {

            searchString = searchString.toLowerCase();
            angular.forEach($scope.patientScreen.patientList, function (item) {
                if (item.dischargeNotes.indexOf(searchString) !== -1
                    || item.disease.indexOf(searchString) !== -1
                    || item.email.indexOf(searchString) !== -1
                    || item.name.indexOf(searchString) !== -1
                    || item.contactNumber.indexOf(searchString) !== -1
                    || item.status.indexOf(searchString) !== -1
                    || item.followUpDueOn.indexOf(searchString) !== -1
                ) {

                    result.push(item);
                }
            });
        }
        $scope.patientScreen.patientList = result;


    };

    $scope.takeFollowUp = function () {


        $scope.patientScreen.currPatient = currPatient;


    };

    $scope.listItemClicked = function (currPatient) {


        $scope.patientScreen.currPatient = currPatient;
        $http.get(url.listFollowupByPatient + $scope.patientScreen.currPatient.patientId)
            .success(function (response) {
                $scope.patientScreen.currPatient.files = response;
                $scope.patientScreen.previousChancesData = [];
                for (var i = 0; i < $scope.patientScreen.currPatient.files.length; i++) {
                    var obj = {
                        "followup": i + 1 + "",
                        "percent": Number($scope.patientScreen.currPatient.files[i].percentage)
                    }
                    $scope.patientScreen.previousChancesData.push(obj);
                }
            })
            .error(function (data) {
            });
    };

    $scope.editPatientDetails = function (id) {

    };

    $scope.showPatientFile = function (id) {

    };


    $scope.submitFollowup = function () {
        sessionStorage.setItem("followupId", $scope.patientScreen.currPatient.id);
        sessionStorage.setItem("followup", JSON.stringify($scope.patientScreen.currPatient));
        $location.path('/patientForm');
        $location.replace();
    };
    $scope.submitReview = function () {
        sessionStorage.setItem("review", JSON.stringify($scope.patientScreen.currPatient));
        $location.path('/reviewForm');
        $location.replace();
    };

    $scope.showPatientFile = function (index) {

        $scope.files = {};
        $scope.files = $scope.patientScreen.currPatient.files[index].record;
        console.log($scope.files);

    }


});
