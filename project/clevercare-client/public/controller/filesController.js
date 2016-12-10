rhrApp.controller('filesController', function filesController($scope) {
  
  //to be removed in code cleanup


  $scope.filesScreen = {};

  $scope.filesScreen.fileList = [{ 'id' : 1, 'name' : 'file1.pdf', 'details': 'detail1' , 'lastModifiedBy' : 'Andrew' , 'lastVisit' : 'Mon 03 Dec 2015 18:27'},
  						{ 'id' : 7, 'name' : 'file2.pde', 'details': 'detail2' , 'lastModifiedBy' : 'Bond' , 'lastVisit' : 'Mon 04 Dec 2016 19:27'},
  						{ 'id' : 3, 'name' : 'system32', 'details': 'detail3' , 'lastModifiedBy' : 'Bob' , 'lastVisit' : 'Mon 05 Dec 2014 12:27'},
  						{ 'id' : 4, 'name' : 'wintool.exe', 'details': 'detail4' , 'lastModifiedBy' : 'Alice' , 'lastVisit' : 'Mon 06 Dec 2013 11:27'},
  						{ 'id' : 5, 'name' : 'vlcpkg.dmg', 'details': 'detail5' , 'lastModifiedBy' : 'Pearson' , 'lastVisit' : 'Mon 07 Dec 2012 10:27'}];
  
  //initially keep first record selected
  $scope.filesScreen.currFile = $scope.filesScreen.fileList[0];


  //to be removed in code cleanup


  $scope.listItemClicked = function(currFile) {


  	$scope.filesScreen.currFile = currFile;


  };
});