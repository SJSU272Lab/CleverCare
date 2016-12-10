var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

exports.listFollowUp = function (msg, callback) {

    var today = new Date();
    Followup.find({isDone: false,"dueDate": {"$lte": today}})
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
    Followup.find({isDone: false,"dueDate": {"$lte": today}})
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
                console.log(result);
                callback(null, result);
            }
        });
};

exports.listFollowUpTotal = function (msg, callback) {

    var today = new Date();
    Followup.find({"dueDate": {"$lte": today}},function (err, result) {
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
                    done:done,
                    notDone:notDone
                };
                callback(null, response);
            }
        });
};


exports.submitFollowup = function (msg, callback) {

    var query = {_id: msg.followupId};
    var notes = {
        note_by: new ObjectId(msg.taken_by),//use from session when actual implementation
        content: msg.notes
    }

    var followupDetails = {
        $set: {taken_by: msg.taken_by, isDone: true, record: msg.record, percentage: msg.percentage,status:"Review required"}
    };
    if (notes.content) {
        followupDetails.$push = {notes: notes};
    }

    Followup.findOneAndUpdate(query, followupDetails, function (err, result) {
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
