rhrApp.controller('reviewController', ["$scope", '$mdDialog','$http', '$location', function ($scope, $mdDialog,$http,$location) {

    //to be removed in code cleanup

    var review = JSON.parse(sessionStorage.getItem("review"));
    $scope.reviewScreen = review.record;
    $scope.percentage = review.percentage;
    $scope.reviewScreen.searchTerm = "";
////////
    $scope.reviewScreen.notes = '';
    $scope.reviewScreen.subject = '';

    $scope.reviewScreen.videoOptions = [  {videoName: '--Select--', videoUrl: '' },
        {videoName: 'sample.mp4', videoUrl: 'sample.mp4' },
        {videoName: 'sample1.mp4', videoUrl: 'sample1.mp4' },
        {videoName: 'sample2.mp4', videoUrl: 'sample2.mp4' }];
    $scope.reviewScreen.videoSelected = $scope.reviewScreen.videoOptions[0];
    $scope.videoChanged = function() {

        $scope.reviewScreen.notes = $scope.reviewScreen.notes + " \n" + $scope.reviewScreen.videoSelected.videoUrl;

    };
//////


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



        var note = {
            email: review.email,
            subject: $scope.reviewScreen.subject,
            note: $scope.reviewScreen.notes
        };


        $http.post('/submitReview', d)
            .success(function (data) {
                if (data) {
                    $http.post('/sendNote', note)
                        .success(function (response) {
                            if (response) {
                                console.log(response);
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
