rhrApp.controller('tutorialController', function tutorialController($scope, $routeParams) {
  
  //to be removed in code cleanup

  $scope.tutorialData = {};
  $scope.tutorialData.videoName = "/videos/"+$routeParams.videoId;

  //to be removed in code cleanup

});