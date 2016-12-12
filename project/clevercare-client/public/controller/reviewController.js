rhrApp.controller('reviewController', ["$scope", '$mdDialog', '$http', '$location', function ($scope, $mdDialog, $http, $location) {

    //to be removed in code cleanup

    var review = JSON.parse(sessionStorage.getItem("review"));
    $scope.reviewScreen = review.record;
    $scope.percentage = review.percentage;
    $scope.reviewScreen.searchTerm = "";
////////
    $scope.reviewScreen.notes = '';
    $scope.reviewScreen.subject = '';
    var tempVideos = sessionStorage.getItem("tutorials");

    var videos = JSON.parse(tempVideos);
    $scope.reviewScreen.videoOptions = [{videoName: '--Select--', videoUrl: ''}];
    for (var i = 0; i < videos.length; i++) {
        $scope.reviewScreen.videoOptions.push({
            videoName: videos[i],
            videoUrl: 'http://localhost:3000/#/tutorial/' + videos[i]
        })
    }
    $scope.reviewScreen.videoSelected = $scope.reviewScreen.videoOptions[0];
    $scope.videoChanged = function () {
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

        console.log(d);
        $http.post('/submitReview', d)
            .success(function (data) {
                if (data) {
                    if (note !== '' || subject !== '') {
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
                }
            })
            .error(function (data) {
            });


    };


}]);
