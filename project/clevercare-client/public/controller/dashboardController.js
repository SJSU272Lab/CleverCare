rhrApp.controller('dashboardController', function dashboardController($scope, $http, $filter,$location, $rootScope) {

    //to be removed in code cleanup


    /*var d = {email_id: email_id, password: pwd};
     $http.post('/signin', d)
     .success(function (data) {

     })
     .error(function (data) {

     });
    */



    if (!sessionStorage.getItem("usertype")) {
        $location.path('/login');
        $location.replace();
    }
    var url = {};
    $scope.userdata = {};
    $scope.dashboardData = {};
    $scope.patientScreen = {};

 /*   $scope.dashboardData.totalreviewsData = [
        {'name': 'George', 'reviewsdone' : 80, 'reviewspending': 20},
        {'name': 'David', 'reviewsdone' : 50, 'reviewspending': 10},
        {'name': 'Ngyuen', 'reviewsdone' : '70', 'reviewspending': '30'},
        {'name': 'Zing', 'reviewsdone' : '90', 'reviewspending': '15'}];
*/
    /* $scope.dashboardData.previousChancesData = [{"followup": "January", "percent": 45 },
                                                    {"followup": "Feb", "percent": 12 }];*/

    $scope.dashboardData.reaadmissionovertimedata = [{"month1": "1", "cases": 90 },                                          {"month" : "February", "cases": 80 },
        {"month1": "2", "cases": 72},
        {"month1": "3", "cases": 61},
        {"month1": "4", "cases": 47 },
        {"month1": "5", "cases": 32 },
        {"month1": "6", "cases": 27}];
    var usertype = sessionStorage.getItem("usertype");
    var userId = sessionStorage.getItem("userId");
    var graphLabel;
    var graphLabelNot;
    $scope.userdata.usertype = usertype;

    if ("doctor" == usertype) {
        url.totals = "/listFollowUps/Review/Total";
        url.critical = "/listFollowUps/Review/Critical";
        url.notes = "/notes/"+userId+"?usertype="+usertype;
        graphLabel = "Reviewed";
        graphLabelNot = "Not reviewed";
    }

    if ("nurse" == usertype) {
        url.totals = "/listFollowUps/Total";
        url.critical = "/listFollowUps/Critical";
        url.notes = "/notes/"+userId+"?usertype="+usertype;
        graphLabel = "Done";
        graphLabelNot = "Not done";
    }


    if ("doctor" == usertype || "nurse" == usertype) {
        $http.get(url.totals)
            .success(function (response) {
                $scope.dashboardData.patientCount = Number(response.notDone);
                $scope.dashboardData.nurseProgressChartData = [
                    {label: graphLabel, value: response.done},
                    {label: graphLabelNot, value: response.notDone}];
            })
            .error(function (data) {

            });

        $http.get(url.critical)
            .success(function (response) {
                var criticalArr = [];
                for (var i = 0; i < response.length; i++) {
                    var criticalObj = {
                        id: i + 1,
                        name: response[i].patientId.firstname + " " + response[i].patientId.lastname,
                        status: response[i].status,
                        lastVisit: $filter('date')(response[i].dueDate, "MM/dd/yyyy")
                    }
                    criticalArr.push(criticalObj);
                }
                $scope.dashboardData.recentFivePatient = criticalArr;
                $scope.dashboardData.recentPatientCount = response.length;
            })
            .error(function (data) {

            });

        $http.get(url.notes)
            .success(function (response) {
                $scope.dashboardData.noteCount = response.notes.length;
                $rootScope.notes = response.notes;
            })
            .error(function (data) {

            });
    }

    $scope.addUser = function (type) {

       sessionStorage.setItem("addtype",type);
        $location.path('/addUser');
        $location.replace();
    }

    $http.get('/doctorAnalysis')
        .success(function (response) {
            $scope.dashboardData.totalreviewsData = response;
            console.log( $scope.dashboardData.totalreviewsData);
        })
        .error(function (data) {

        });
});