rhrApp.controller('dashboardController', function dashboardController($scope) {
  
  //to be removed in code cleanup
  console.log("dashboardController : going in");

  $scope.userdata = {};
  $scope.dashboardData = {};
  $scope.userdata.usertype = 'nurse';

  //dummy data 
  $scope.dashboardData.patientCount = 40;
  $scope.dashboardData.noteCount = 30;
  $scope.dashboardData.testCount = 111;

  $scope.percentfilter = function(y, data){return $scope.dashboardData.nurseProgress + '%';}
  $scope.dashboardData.nurseProgress = 70;
  $scope.dashboardData.nurseProgressChartData = [
            {label: 'Progress', value: $scope.dashboardData.nurseProgress },
            {label: 'Progress', value: (100 - $scope.dashboardData.nurseProgress) }];


  $scope.dashboardData.recentFivePatient = [{ 'id' : 1, 'name' : 'mathew wayne' , 'address' : '101 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '11/06/9016'},
              { 'id' : 7, 'name' : 'allen smith' , 'address' : '33 S 3th ST, san jose, CA' , 'status' : 'feedback required' , 'lastVisit' : '11/0/9016'},
              { 'id' : 3, 'name' : 'anderson cooper' , 'address' : '901 S 4th ST, san jose, CA' , 'status' : 'feddback required' , 'lastVisit' : '10/01/9016'},
              { 'id' : 4, 'name' : 'barry watson' , 'address' : '101 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '09/03/9016'},
              { 'id' : 5, 'name' : 'bruce perry' , 'address' : '901 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '09/06/9016'}];
  
  

  $scope.dashboardData.productTypeData = [{"weekday": "Monday", "cases": 4 },
                                          {"weekday": "Tuesday", "cases": 8 },
                                          {"weekday": "Wednesday", "cases": 31},
                                          {"weekday": "Thursday", "cases": 5},
                                          {"weekday": "Friday", "cases": 61 },
                                          {"weekday": "Saturday", "cases": 6 },
                                          {"weekday": "Sunday", "cases": 7}];
  //to be removed in code cleanup
  console.log("dashboardController : moving out");

});