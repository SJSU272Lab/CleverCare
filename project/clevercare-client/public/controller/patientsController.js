rhrApp.controller('patientsController', function ($scope, $http, $location,$rootScope, $filter,$mdDialog) {

    //to be removed in code cleanup
    console.log("patientsController : going in");


    var url = {};
    $scope.userdata = {};
    $scope.patientScreen = {};
    $scope.patientScreen.searchTerm = "";
    $scope.patientScreen.patientList = [];
    $scope.patientScreen.currPatient = {};
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
            var patientArr = [];
            for (var i = 0; i < response.length; i++) {
                console.log(response[i]);
                var patient = {
                    'id': response[i]._id,
                    'patientId':response[i].patientId._id,
                    'dischargeNotes': response[i].patientFileId.dischargeNotes,
                    'disease': response[i].patientFileId.disease ,
                    'age': response[i].patientId.age,
                    'email': response[i].patientId.email,
                    'name': response[i].patientId.firstname +" "+response[i].patientId.lastname,
                    'contactNumber': response[i].patientId.phonenumber,
                    'status': response[i].status,
                    'followUpDueOn': $filter('date')(response[i].dueDate, "MM/dd/yyyy")
                }
                patientArr.push(patient);
            }
            $scope.patientScreen.patientList = patientArr;

            $scope.patientScreen.currPatient = $scope.patientScreen.patientList[0];

            console.log("Current patient "+ JSON.stringify($scope.patientScreen.currPatient));
            $http.get(url.listFollowupByPatient+$scope.patientScreen.currPatient.patientId)
                .success(function (response) {
                    $scope.patientScreen.currPatient.files = response;
                })
                .error(function(data) {

                });
        })
        .error(function (data) {

        });


    //initially keep first record selected



    //to be removed in code cleanup
    console.log("patientsController : moving out");

    $scope.searchClicked = function (currPatient) {
        console.log("searchClicked : going in");

        console.log("Search this: " + $scope.patientScreen.searchTerm);

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

        console.log("searchClicked : moving out");
    };

    $scope.takeFollowUp = function () {
        console.log("listItemClicked : going in");

        $scope.patientScreen.currPatient = currPatient;


        console.log("listItemClicked : moving out");
    };

    $scope.listItemClicked = function (currPatient) {
        console.log("listItemClicked : going in");

        $scope.patientScreen.currPatient = currPatient;
        $http.get(url.listFollowupByPatient+$scope.patientScreen.currPatient.patientId)
            .success(function (response) {
                $scope.patientScreen.currPatient.files = response;
            })
            .error(function(data) {

            });
        console.log("listItemClicked : moving out");
    };

    $scope.editPatientDetails = function (id) {
        console.log("editPatientDetails : going in");
        console.log("editPatientDetails : moving out");
    };

    $scope.showPatientFile = function (id) {
        console.log("showPatientFile : going in");
        console.log("showPatientFile : moving out");
    };


    $scope.showAdvanced = function () {
        /*$mdDialog.show({
            controller: 'patientFormController',
            templateUrl: 'patientForm.ejs',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });*/
        console.log()
        sessionStorage.setItem("followup",$scope.patientScreen.currPatient.id);
        $location.path('/patientForm');
        $location.replace();
    };

    function PatientFollowUpModalController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    }

});
