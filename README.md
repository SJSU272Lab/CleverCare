## Fall16-Team3

Project Name : CleverCare

### Abstract :
Reducing Hospital Readmissions
	One of the major contributors to healthcare costs is hospital readmissions. Research shows that 15-20% of people who are discharged from hospital are readmitted within 30 days or less. Many of these readmissions are preventable. There are some intervention techniques that can help address this issue. One of them is to use machine learning to predict the chances of readmission of a patient. The project facilitates out-patient care to take feedbacks at regular intervals from patient once he/she is discharged and calculating his/her chances of readmission using machine learning. The doctor can review these results and take appropriate action by providing some suggestions and educational content to the patient, and reschedule patient’s next feedback.


### User Stories:

	As a doctor, I can view feedback and prediction index of readmission for my patients,
	so that, I can decide measures to be taken to mitigate chances of readmission.

	As an admin, I can view analysis of readmission data,
	so that, I can manage hospital resources efficiently to reduce unnecessary expenses.

	As Out Patient Department nurse, I collect feedback from recently discharged patients,
	so that received data can be fed to prediction engine and predict possibility of readmission for patients.
	

## Architecture diagram:
![Architecture diagram](https://github.com/SJSU272Lab/Fall16-Team3/blob/master/Artifacts/272_architecture_diagram.png)
	
	As shown in Figure 1, the different components of system are connected with each other. For example, when 
	a user submits credentials in order to log into the system, the browser forwards this request to node.js 
	client. Further, the node.js client communicates with node.js server using MOM-RabbitMQ. The node.js 
	server validates the credentials against encrypted credentials stored in mongoDb database.


### Flow diagram:
![Flow Diagram](https://github.com/SJSU272Lab/Fall16-Team3/blob/master/Artifacts/272_flow_diagram.png)
	

### Report:
	A detailed description of the project with proper screenshots and explaination can be found 
[here](https://github.com/SJSU272Lab/Fall16-Team3/blob/master/Artifacts/CleverCare_team3_report.doc)
	

### Team members:
Team 3

[Darshit Thesiya](https://github.com/dthesiya)

[Siddharth Daftari](https://github.com/siddharthrdaftari)

[Tanmay Bhatt](https://github.com/Tanmayb7)

[Vikas Miyani](https://github.com/vikasmiyani)
	
