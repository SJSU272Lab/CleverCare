rhrApp.controller('addpatientController', function addpatientController($scope, $http) {

    $scope.patient = {
        firstName: '',
        lastName: '',
        email: '',
        disease: '',
        dischargeNote: '',
        doctorId: '',
        phone: '',
        gender: '',
        age: '',
        address: ''
    };
    $scope.isPatientAdded = false;
    $http.get('/doctorList')
        .success(function (data) {
            if (data) {
                $scope.patient.doctorOption = [{doctorName: '--Select--', doctorId: ''}];
                for (var i = 0; i < data.length; i++) {
                    $scope.patient.doctorOption.push({
                        doctorName: data[i].firstname + " " + data[i].lastname,
                        doctorId: data[i]._id
                    })
                }
                $scope.patient.doctorSelected = $scope.patient.doctorOption[0];
            }
        })
        .error(function (data) {
        });

    $scope.addPatient = function () {

        var d = {
            firstname: $scope.patient.firstName,
            lastname: $scope.patient.lastName,
            email: $scope.patient.email,
            patientId: null,
            disease: $scope.patient.disease,
            dischargeNote: $scope.patient.dischargeNote,
            doctorId: $scope.patient.doctorSelected.doctorId,
            phone: $scope.patient.phone,
            gender: $scope.patient.gender,
            age: $scope.patient.age,
            address: $scope.patient.address,
        };
        console.log(d);
        $http.post('/addPatient', d)
            .success(function (data) {

                if (data) {
                    $scope.isPatientAdded = true;
                }
            })
            .error(function (data) {
                $scope.isPatientAdded = false;
            });
    };

});
