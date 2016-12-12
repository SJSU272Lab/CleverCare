var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

var http = require('http');

var ml_url = "localhost";

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
            }
            //console.log(result);
            if (!result) {
                callback(null, null);
            }
            if (result) {
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
    Followup.findOneAndUpdate(query, followupDetails, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            callback(null, result);
            var admission_type = 0;
            switch (msg.record.admissionTypeSelected) {
                case "Emergency":
                    admission_type = 1;
                    break;
                case "Urgent":
                    admission_type = 2;
                    break;
                case "Elective":
                    admission_type = 3;
                    break;
                case "Newborn":
                    admission_type = 4;
                    break;
                case "Trauma Center":
                    admission_type = 5;
                    break;
            }
            var insulin = 0;
            switch (msg.record.insulinSelected) {
                case "Steady":
                    insulin = 1;
                    break;
                case "No":
                    insulin = 2;
                    break;
                case "Up":
                    insulin = 3;
                    break;
                case "Down":
                    insulin = 4;
                    break;
            }
            var body = {
                gender: (msg.record.gender === "Female") ? 0 : 1,
                age_category: (msg.record.ageCategory === "Young") ? 0 : ((msg.record.ageCategory === "Adult") ? 1 : 0),
                // weight: (msg.notes.weight > 200) ? 9 : Number(msg.notes.weight) / 25,
                weight: 5,
                admission_type: admission_type,
                time_in_hospital: 10,
                insulin: insulin,
                diabetesmed: (msg.record.diabetesMed == "Yes") ? 1 : 0,
            };
            // var body = {
            //     gender: 1,
            //     age_category: 1,
            //     weight: 8,
            //     admission_type: 1,
            //     time_in_hospital: 10,
            //     insulin: 1,
            //     diabetesmed: 1,
            // };
            var req_body = JSON.stringify(body);
            console.log(req_body);

            var options = {
                host: ml_url,
                port: 3001,
                path: '/v1/getScore',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Length': req_body.length
                }
            };
            var post_req = http.request(options, function (res) {
                    res.setEncoding('utf8');
                    res.on('data', function (chunc) {
                        console.log(chunc);
                        try {
                            var chunk = JSON.parse(chunc);
                            console.log(chunk.probability.length);
                            var updateChances = {
                                $set: {percentage: 100 * (((chunk.prediction) > 0) ? chunk.probability[0] : (1 - chunk.probability[0]))}
                            };
                            Followup.findOneAndUpdate(query, updateChances, function (err, result) {
                                console.log(err);
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    });
                }
            );
            // post the data
            post_req.write(req_body);
            post_req.end();
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
