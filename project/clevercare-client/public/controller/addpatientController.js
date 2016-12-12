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
    $scope.patient.admissionTypeOption =  ['Emergency', 'Urgent', 'Elective','New born','Trauma Center'];
    $scope.patient.admissionTypeSelected = 'Emergency';
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

        var firstname = $scope.patient.firstName;
        var lastname = $scope.patient.lastName;
        var email = $scope.patient.email;
        var disease = $scope.patient.disease;
        var dischargeNote = $scope.patient.dischargeNote;
        var doctorId = $scope.patient.doctorSelected.doctorId;
        var phone = $scope.patient.phone;
        var gender = $scope.patient.gender;
        var age = $scope.patient.age;
        var address = $scope.patient.address;

        var regexPattern = /script\b[^>]*>([\s\S]*?)/gim;

        var isScript = regexPattern.test(address) || regexPattern.test(firstname) || regexPattern.test(lastname) || regexPattern.test(email) || regexPattern.test(disease) || regexPattern.test(dischargeNote) || regexPattern.test(doctorId) || regexPattern.test(phone) || regexPattern.test(gender);
        if (!isScript) {
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
                admissionType: $scope.patient.admissionTypeSelected
            };
            $http.post('/addPatient', d)
                .success(function (data) {

                    if (data) {
                        $scope.isPatientAdded = true;
                    }
                })
                .error(function (data) {
                    $scope.isPatientAdded = false;
                });
        }
    };

});
