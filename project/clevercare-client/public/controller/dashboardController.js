rhrApp.controller('dashboardController', function dashboardController($scope,$http,$filter) {
  
  //to be removed in code cleanup
  console.log("dashboardController : going in");

    /*var d = {email_id: email_id, password: pwd};
    $http.post('/signin', d)
        .success(function (data) {

        })
        .error(function (data) {

        });
*/

    $http.get("/listFollowUps/Total")
        .success(function (response) {
            $scope.dashboardData.patientCount = Number(response.notDone);
            $scope.dashboardData.nurseProgressChartData = [
                {label: 'Done', value: response.done },
                {label: 'Not Done', value: response.notDone }];
        })
        .error(function(data) {

        });

    $http.get("/listFollowUps/Critical")
        .success(function (response) {
            var criticalArr = [];
            for(var i=0;i<response.length;i++){
                console.log(response[i]);
                    var criticalObj = {
                        id:i+1,
                        name:response[i].patientId.firstname+" "+response[i].patientId.lastname,
                        status:response[i].status,
                        lastVisit: $filter('date')(response[i].dueDate, "MM/dd/yyyy")
                    }
               criticalArr.push(criticalObj);
            }
            $scope.dashboardData.recentFivePatient = criticalArr;
            $scope.dashboardData.recentPatientCount = response.length;
        })
        .error(function(data) {

        });

    $http.get("/notes/count/583f4b898a432621ccf06265?usertype=doctor")
        .success(function (response) {
            $scope.dashboardData.noteCount = response.notes.length;
        })
        .error(function(data) {

        });

  $scope.userdata = {};
  $scope.dashboardData = {};
  $scope.userdata.usertype = 'nurse';

  //dummy data 
 // $scope.dashboardData.patientCount = 40;
  $scope.dashboardData.noteCount = 30;
  $scope.dashboardData.testCount = 111;

  $scope.percentfilter = function(y, data){return $scope.dashboardData.nurseProgress + '%';}
  $scope.dashboardData.nurseProgress = 70;
  $scope.dashboardData.nurseProgressChartData = [
            {label: 'Progress', value: $scope.dashboardData.nurseProgress },
            {label: 'Progress', value: (100 - $scope.dashboardData.nurseProgress) }];


 /* $scope.dashboardData.recentFivePatient = [{ 'id' : 1, 'name' : 'mathew wayne' , 'address' : '101 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '11/06/9016'},
              { 'id' : 7, 'name' : 'allen smith' , 'address' : '33 S 3th ST, san jose, CA' , 'status' : 'feedback required' , 'lastVisit' : '11/0/9016'},
              { 'id' : 3, 'name' : 'anderson cooper' , 'address' : '901 S 4th ST, san jose, CA' , 'status' : 'feddback required' , 'lastVisit' : '10/01/9016'},
              { 'id' : 4, 'name' : 'barry watson' , 'address' : '101 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '09/03/9016'},
              { 'id' : 5, 'name' : 'bruce perry' , 'address' : '901 S 4th ST, san jose, CA' , 'status' : 'visit required' , 'lastVisit' : '09/06/9016'}];
*/
  //to be removed in code cleanup
  console.log("dashboardController : moving out");

});