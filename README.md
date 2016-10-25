# Fall16-Team3

Project Name : CleverCare

Abstract :
Reducing Hospital Readmissions
	One of the major contributors to healthcare costs is hospital readmissions. 
	Research shows that 15-20% of people who are discharged from hospital are readmitted within 30 days or less. 
	Many of these readmissions are preventable. Patients don’t mind fewer hospitalizations and a huge amount of money can be saved by avoiding such readmissions. 
	Hospitals also can avoid being penalized by reducing readmission rate.
	There are many programs that try to achieve this but they have following weaknesses : 
		->These programs are not data-driven in understanding where readmission problems exist.
		-> They are mostly based on changes made to hospital processes and not focus on post discharge care.
		-> The payment reforms do not support to fund the post discharge care.
	Solution:
		The solution can be divided into a 2 step process:
		1) Analyze the data to identify the types and causes of readmissions and predict the chances of readmission using patients' feedback records.
			-> Hospitals can analyze all major causes of readmissions and manage their resource allocation accordingly.
			-> Constant feedback of patient’s health can be taken post discharge at regular intervals from patients.
			-> Past readmission datasets will be used to predict chances of readmission using machine learning based on given feedback.
		2) Step 2 involves devising a way to extend the treatment of such diseases even after being discharged from hospital.
			-> The doctor analyses the data collected from this feedback as well as predictive analysis data and if it suggests that patient needs medical attention, then they can be educated and guided for proper outpatient care avoiding hospital readmission. 
			-> Also, a proper intimation system will be developed where patients are texted reminding them to follow the instructions given by their doctor.


User Stories:
	As a doctor, I can view feedback and prediction index of readmission for my patients,
	so that, I can decide measures to be taken to mitigate chances of readmission.

	As a Hospital authority, I can view analysis of readmission data,
	so that, I can manage hospital resources efficiently to reduce unnecessary expenses.

	As Out Patient Department persona, I collect feedback from recently discharged patients,
	so that received data can be fed to prediction engine and predict possibility of readmission for patients.