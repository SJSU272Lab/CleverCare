rhrApp.controller('reviewController', ["$scope", '$mdDialog','$http', '$location', function ($scope, $mdDialog,$http,$location) {

    //to be removed in code cleanup

    var review = JSON.parse(sessionStorage.getItem("review"));
    $scope.reviewScreen = review.record;
    $scope.percentage = review.percentage;
    $scope.reviewScreen.searchTerm = "";


    $scope.percentfilter = function (y, data) {
        return $scope.percentage + '%';
    }

    $scope.reviewScreen.chart1Data = [
        {label: 'Result', value: $scope.percentage},
        {label: 'Result', value: (100 - $scope.percentage)}];


    //to be removed in code cleanup



    $scope.scheduleFollowUpClicked = function () {
        var d = {
            patientId: review.patientId,
            doctorId: review.doctorId,
            patientFileId: review.patientFileId
        };
        $http.post('/scheduleFollowup', d)
            .success(function (data) {

                if (data.success) {
                    $scope.message = data.message;
                }
            })
            .error(function (data) {
            });
    };

    $scope.doneClicked = function (id) {

        var d = {
            followupId: review.id,
            doctorId: review.doctorId
        };

        $scope.subject = "This is actual testing";
        $scope.email = "vikasmiyani83@gmail.com";
        var note = {
            email: $scope.email,
            subject: $scope.subject,
            note: $scope.sendnote
        };

        $http.post('/submitReview', d)
            .success(function (data) {

                if (data) {
                    $http.post('/sendNote', note)
                        .success(function (response) {
                            if (response) {
                                $location.path('/patients');
                                $location.replace();
                            }
                        })
                        .error(function (data) {
                        });
                }
            })
            .error(function (data) {
            });


    };


}]);
