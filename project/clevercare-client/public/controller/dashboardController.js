rhrApp.controller('dashboardController', function dashboardController($scope,$http,$filter,$rootScope) {
  
  //to be removed in code cleanup
  console.log("dashboardController : going in");

    /*var d = {email_id: email_id, password: pwd};
    $http.post('/signin', d)
        .success(function (data) {

        })
        .error(function (data) {

        });
*/
    var url = {};
    $scope.userdata = {};
    $scope.dashboardData = {};

    var usertype = sessionStorage.getItem("usertype");
    var graphLabel;
    var graphLabelNot;
    $scope.userdata.usertype = usertype;
    if("doctor" == usertype){
        url.totals = "/listFollowUps/Review/Total";
        url.critical = "/listFollowUps/Review/Critical";
        url.notesCount = "/notes/count/583f4b898a432621ccf06265?usertype=doctor";
        graphLabel = "Reviewed";
        graphLabelNot = "Not reviewed";
    }

    if("nurse" == usertype){
        url.totals = "/listFollowUps/Total";
        url.critical = "/listFollowUps/Critical";
        url.notesCount = "/notes/count/583f4b898a432621ccf06265?usertype=doctor";
        graphLabel = "Done";
        graphLabelNot = "Not done";
    }



    $http.get(url.totals)
        .success(function (response) {
            $scope.dashboardData.patientCount = Number(response.notDone);
            $scope.dashboardData.nurseProgressChartData = [
                {label: graphLabel, value: response.done },
                {label: graphLabelNot, value: response.notDone }];
        })
        .error(function(data) {

        });

    $http.get(url.critical)
        .success(function (response) {
            var criticalArr = [];
            for(var i=0;i<response.length;i++){
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

    $http.get(url.notesCount)
        .success(function (response) {
            $scope.dashboardData.noteCount = response.notes.length;
            $rootScope.notes = response.notes;
        })
        .error(function(data) {

        });
});