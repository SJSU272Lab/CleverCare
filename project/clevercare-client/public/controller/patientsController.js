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
                    'patientFileId': response[i].patientFileId,
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
                    'percentage': response[i].percentage
                }
                patientArr.push(patient);
            }
            $scope.patientScreen.patientList = patientArr;

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

        $scope.patientScreen.patientList = [
            {
                'id': 13,
                'dischargeNotes': 'notes1',
                'disease': 'Common cold',
                'age': 28,
                'email': 'abc@gmail.com',
                'name': 'mathew wayne',
                'contactNumber': '1234567890',
                'status': 'visit required',
                'followUpDueOn': '11/06/9016'
            },
            {
                'id': 73,
                'dischargeNotes': 'notes1',
                'disease': 'Common cold',
                'age': 28,
                'email': 'abc@gmail.com',
                'name': 'allen smith',
                'contactNumber': '1234567890',
                'status': 'feedback required',
                'followUpDueOn': '11/0/9016'
            },
            {
                'id': 33,
                'dischargeNotes': 'notes1',
                'disease': 'Common cold',
                'age': 28,
                'email': 'abc@gmail.com',
                'name': 'anderson cooper',
                'contactNumber': '1234567890',
                'status': 'feddback required',
                'followUpDueOn': '10/01/9016'
            },
            {
                'id': 43,
                'dischargeNotes': 'notes1',
                'disease': 'Common cold',
                'age': 28,
                'email': 'abc@gmail.com',
                'name': 'barry watson',
                'contactNumber': '1234567890',
                'status': 'visit required',
                'followUpDueOn': '09/03/9016'
            },
            {
                'id': 53,
                'dischargeNotes': 'notes1',
                'disease': 'Common cold',
                'age': 28,
                'email': 'abc@gmail.com',
                'name': 'bruce perry',
                'contactNumber': '1234567890',
                'status': 'visit required',
                'followUpDueOn': '09/06/9016'
            }
        ];


    };

    $scope.takeFollowUp = function () {


        $scope.patientScreen.currPatient = currPatient;


    };

    $scope.listItemClicked = function (currPatient) {


        $scope.patientScreen.currPatient = currPatient;
        $http.get(url.listFollowupByPatient + $scope.patientScreen.currPatient.patientId)
            .success(function (response) {

                $scope.patientScreen.currPatient.files = response;

            })
            .error(function (data) {

            });

    };

    $scope.editPatientDetails = function (id) {

    };

    $scope.showPatientFile = function (id) {

    };


    $scope.submitFollowup = function () {
        sessionStorage.setItem("followup", $scope.patientScreen.currPatient.id);
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
