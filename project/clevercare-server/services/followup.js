var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var http = require('http');

var ml_url = "http://localhost";

var options = {
    host: ml_url,
    port: 3001,
    path: '/v1/getScore',
    method: 'POST'
};

exports.listFollowUp = function (msg, callback) {

    var today = new Date();
    Followup.find({isDone: false, "dueDate": {"$lte": today}})
        .sort('dueDate')
        .populate('patientId')
        .populate('patientFileId')
        .populate('doctorId')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }
            if (!result) {
                callback(null, null);
            }
            if (result) {
                console.log(result.length);
                callback(null, result);
            }
        });
};

exports.listCriticalFollowUp = function (msg, callback) {

    var today = new Date();
    Followup.find({isDone: false, "dueDate": {"$lte": today}})
        .sort('dueDate')
        .limit(5)
        .populate('patientId')
        .populate('patientFileId')
        .populate('doctorId')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               Q
            //console.log(result);
            if (!result) {
                callback(null, null);
            }
            if (result) {
                console.log(result);
                callback(null, result);
            }
        });
};

exports.listFollowUpTotal = function (msg, callback) {

    var today = new Date();
    Followup.find({"dueDate": {"$lte": today}}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        //console.log(result);
        if (!result) {
            callback(null, null);
        }
        if (result) {
            var done = 0;
            var notDone = 0;
            for (var i = 0; i < result.length; i++) {
                if (result[i].isDone) done++;
                else notDone++;
            }
            var response = {
                done: done,
                notDone: notDone
            };
            callback(null, response);
        }
    });
};


exports.submitFollowup = function (msg, callback) {

    var query = {_id: new ObjectId(msg.followupId)};
    var notes = {
        note_by: new ObjectId(msg.taken_by),//use from session when actual implementation
        content: msg.notes
    }

    var followupDetails = {
        $set: {taken_by: msg.taken_by, isDone: true, record: msg.record, status: "Review required"}
    };
    if (notes.content) {
        followupDetails.$push = {notes: notes};
    }
    console.log(followupDetails);
    Followup.findOneAndUpdate(query, followupDetails)
        .populate('patientId')
        .populate('patientFileId')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }
            console.log(result);
            if (!result) {
                callback(null, null);
            }
            // var admission_type = 0;
            // switch (result.patientFileId.admissionType) {
            //     case "Emergency":
            //         admission_type = 1;
            //         break;
            //     case "Urgent":
            //         admission_type = 2;
            //         break;
            //     case "Elective":
            //         admission_type = 3;
            //         break;
            //     case "Newborn":
            //         admission_type = 4;
            //         break;
            //     case "Trauma Center":
            //         admission_type = 5;
            //         break;
            // }
            // var insulin = 0;
            // switch (msg.notes.insulin) {
            //     case "Steady":
            //         insulin = 1;
            //         break;
            //     case "No":
            //         insulin = 2;
            //         break;
            //     case "Up":
            //         insulin = 3;
            //         break;
            //     case "Down":
            //         insulin = 4;
            //         break;
            // }
            if (result) {
                console.log(result);
                callback(null, result);
                // var body = {
                //     gender: (result.patientId.gender === "Female") ? 0 : 1,
                //     age_category: (result.patientId.ageCategory === "Young") ? 0 : ((result.patientId.ageCategory === "Adult") ? 1 : 0),
                //     weight: (msg.notes.weight > 200) ? 9 : Number(msg.notes.weight) / 25,
                //     admission_type: admission_type,
                //     time_in_hospital: 10,
                //     insulin: insulin,
                //     diabetesmed: 1,
                // };
                var body = {
                    gender: 1,
                    age_category: 1,
                    weight: 8,
                    admission_type: 1,
                    time_in_hospital: 10,
                    insulin: 1,
                    diabetesmed: 1,
                };
                http.request(options, function (res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.on('data', function (chunk) {
                        console.log('BODY: ' + chunk);

                    });
                }).end(body);
            }
        });
};

exports.listFollowUpByPatient = function (msg, callback) {

    Followup.find({patientId: msg.patientId, isDone: true})
        .sort('dueDate')
        .populate('patientId')
        .populate('patientFileId')
        .populate('doctorId')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }
            //console.log(result);
            if (!result) {
                callback(null, null);
            }
            if (result) {
                console.log(result);
                callback(null, result);
            }
        });
};

exports.scheduleFollowup = function (msg, callback) {

    var followupPlans = new Followup();
    followupPlans.patientFileId = msg.patientFileId;//use already availabel in ejs
    followupPlans.patientId = msg.patientId;//use already availabel in ejs
    followupPlans.doctorId = msg.doctorId;//use already availabel from patient file in ejs
    followupPlans.status = "Followup required";
    // followupPlans.dueDate = new Date() + 2 * 24 * 60 * 60 * 1000;

    followupPlans.save(function (err) {
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, followupPlans);
        }
    });

};
