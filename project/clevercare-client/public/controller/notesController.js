rhrApp.controller('notesController', function notesController($scope, $mdDialog, $http, $location) {

    //to be removed in code cleanup


    if (!sessionStorage.getItem("usertype")) {
        $location.path('/login');
        $location.replace();
    }
    $scope.userdata = {};
    $scope.currentNote = {};

    var usertype = sessionStorage.getItem("usertype");
    var userId = sessionStorage.getItem("userId");
    $scope.userdata.usertype = usertype;
    var url = "/notes/" + userId + "?usertype=" + usertype;

    $http.get(url)
        .success(function (response) {
            response.notes.splice(0, 0);
            $scope.notes = response.notes;
            console.log($scope.notes);
            $scope.currentNote = $scope.notes[0];
            console.log($scope.currentNote);
        })
        .error(function (data) {

        });

    // To Display the selected Note
    $scope.listNoteClicked = function (note) {
        $scope.currentNote = note;
    };

    $scope.save = function () {
        var d = {
            subject: $scope.newnote.subject,
            details: $scope.newnote.details,
            date: new Date(),
            userId: userId,
            usertype: usertype
        }
        $http.post('/addNote', d)
            .success(function (data) {
                if (data) {
                    $scope.notes.push(d);
                    $scope.currentNote =$scope.notes[0];
                    $location.path('/notes');
                    $location.replace();
                }
            })
            .error(function (data) {
            });
    };

    $scope.edit = function () {


        for (var i = 0; i < $scope.notes.length; i++) {
            if ($scope.notes[i].date === $scope.currentNote.date) {
                $scope.notes[i].subject = $scope.currentNote.subject;
                $scope.notes[i].details = $scope.currentNote.details;
            }
        }
        var d = {userId: userId, usertype: usertype, notes: $scope.notes};
        $http.post('/updateNotes', d)
            .success(function (data) {
                if (data) {
                    $location.path('/notes');
                    $location.replace();
                }
            })
            .error(function (data) {
            });
    };

    $scope.delete = function () {

        for (var i = 0; i < $scope.notes.length; i++) {
            if ($scope.notes[i].date === $scope.currentNote.date) {
                $scope.notes.splice(i, 1);
                if ($scope.notes.length !== 0) {
                    $scope.currentNote = $scope.notes[0];
                } else {
                    $scope.currentNote = {};
                }

                break;
            }
        }
        var d = {userId: userId, usertype: usertype, notes: $scope.notes};
        $http.post('/updateNotes', d)
            .success(function (data) {
                if (data) {
                    $location.path('/notes');
                    $location.replace();
                }
            })
            .error(function (data) {
            });
    }

});
