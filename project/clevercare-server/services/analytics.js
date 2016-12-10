/**
 * Created by vicky on 12/9/2016.
 */
var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;

exports.doctorAnalysis = function (msg, callback) {
    "use strict"
    var result = [];
    var flag = false;
    User.find({usertype: "doctor"})
        .exec(function (err, response) {
            if (err) {
                callback(err, null);
            }
            if (!response) {
                callback(null, null);
            } else {
                for (let i = 0; i < response.length; i++) {
                    Followup.aggregate([
                            {
                                $match: {doctorId: response[i]._id}

                            }], function (err, followup) {
                            var obj = {
                                'name': response[i].firstname + " " + response[i].lastname,
                                'reviewsdone': 0,
                                'reviewspending': 0
                            }
                            for (let j = 0; j < followup.length; j++) {
                                if (followup[j].isReviewed === true && followup[j].reviewed_by.equals(response[i]._id)) {
                                    obj.reviewsdone += 1;
                                } else {
                                    obj.reviewspending += 1;
                                }
                            }

                            result.push(obj);
                            if (i === response.length - 1) {
                                flag = true;
                            }
                        }
                    )
                }
                setTimeout(function (flag) {
                    callback(null, result);
                }, 500);
            }
        });
};


exports.predictionAnalysis = function (msg, callback) {
    "use strict"
    var result = [];
    Followup.find({})
        .exec(function (err, response) {
            if (err) {
                callback(err, null);
            }
            if (!response) {
                callback(null, null);
            }
            if (response) {
                var obj = {
                    first: 0,
                    second: 0,
                    third: 0,
                    fourth: 0
                };
                for (var i = 0; i < response.length; i++) {
                    if (0 < response[i].percentage && response[i].percentage <= 25) {
                            obj.first += 1;
                    } else if (25 < response[i].percentage && response[i].percentage <= 50) {
                            obj.second += 1;
                    } else if (51 < response[i].percentage && response[i].percentage <= 75) {
                            obj.third += 1;
                    } else if (76 < response[i].percentage && response[i].percentage <= 100) {
                            obj.fourth += 1;
                    }
                }
                console.log(obj);
                callback(null, obj);
            }
        });
};