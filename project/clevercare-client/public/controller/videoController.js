/**
 * Created by dthesiya on 12/11/2016.
 */
rhrApp.controller('videoController', function tutorialController($scope, $routeParams, $location, Upload) {

    $scope.alertvideo = false;
    /*Video upload*/
    $scope.submitVideo = function () {
        if ($scope.video) {
            $scope.uploadVideo($scope.video);
        }
    };

    // upload on file select
    $scope.uploadVideo = function (file) {
        $scope.alertvideo = false;
        Upload.upload({
            url: '/uploadVideo',
            data: {
                file: file
            }
        }).then(function (resp) {
            $location.path('/dashboard');
            $location.replace();
            $scope.alertvideo = true;
        }, function (resp) {
            $location.path('/dashboard');
            $location.replace();
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };
});