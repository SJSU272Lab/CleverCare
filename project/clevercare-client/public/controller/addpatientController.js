rhrApp.controller('addpatientController', function addpatientController($scope,$http) {

$scope.patient = {firstName : '', lastName : '', email : '', disease : '', dischargeNote : '', doctorId : '', phone : '', gender : '', age : '', address : ''};


$scope.addPatient = function() {

	var d = {firstName: $scope.patient.firstName,
			 lastName:  $scope.patient.lastName,
			 email:$scope.patient.email,
			 patientId : null,
			 disease:$scope.patient.disease,
			 dischargeNote:$scope.patient.dischargeNote,
			 doctorId:$scope.patient.doctorId,
			 phone:$scope.patient.phone,
			 gender:$scope.patient.gender,
			 age:$scope.patient.age,
			 address:$scope.patient.address,
			};

	$http.post('/addPatient', d)
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
