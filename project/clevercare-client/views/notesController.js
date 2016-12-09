rhrApp.controller('notesController', function notesController($scope) {

	//to be removed in code cleanup
	console.log("notesController : going in");
		
	$scope.notes = [{'subject' : 'subject1', 'date' : '12/01/2016', 'details' : 'details1'},
	{'subject' : 'subject2', 'date' : '01/01/2016', 'details' : 'details2'},
	{'subject' : 'subject3', 'date' : '02/02/2016', 'details' : 'details3'},
	{'subject' : 'subject4', 'date' : '03/03/2016', 'details' : 'details4'}];
	

	// To open a Modal for creating a new note
	$scope.currentNote = $scope.notes[0];
	$scope.addNote = function(){

		console.log("Entered add note function");
		$scope.addNoteModal = true;
	};

	$scope.hideModel = function(){

		console.log("Entered hide model function");
		$scope.addNoteModal = false;
	};

	// To Display the selected Note
	$scope.listNoteClicked = function(note) {
  	
  		console.log("into listNoteClicked function");
  		$scope.currentNote = note;
  	};

	//to be removed in code cleanup
  	console.log("notesController : Leaving out");
});