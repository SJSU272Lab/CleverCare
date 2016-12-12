/**
 * http://usejsdoc.org/
 */
var bcrypt = require('bcryptjs');
/*var fecha = require('fecha');*/
/*var mongo = require("./mongo");
 var config = require('./config.js');*/
var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectID;
var ssn = require('ssn');

exports.doLogin = function (msg, callback) {
    var username = msg.username;
    var password = msg.password;

    User.findOne({email: username}, function (err, user) {
        if (err) {
            console.log("err in find");
            callback(err, null);
        }

        if (!user) {
            callback(null, null);
        }
        if (user) {
            console.log(user);
            if (bcrypt.compareSync(password, user.password)) {
                delete user.password;
                callback(null, user);
            } else {
                callback(null, null);
            }
        }
    });
};

exports.changePassword = function (msg, callback) {
        var oldpwd = msg.oldpwd;
        var newpwd = msg.newpwd;
        var userId = msg.userId;

    console.log(oldpwd+ " "+newpwd+" "+userId);
    User.findOne({_id: new ObjectId(userId)}, function (err, user) {
        if (err) {
            console.log("err in find");
            callback(err, null);
        }

        if (!user) {
            callback(null, null);
        }
        if (user) {
            if (bcrypt.compareSync(oldpwd, user.password)) {
                var salt = bcrypt.genSaltSync(10);
                var passwordToSave = bcrypt.hashSync(newpwd, salt);
               User.update({_id:new ObjectId(userId)},{$set:{password:passwordToSave}},function (err, response) {
                   if(err){
                       callback(err, null);
                   }
                   if(response){
                       callback(null, response);
                   }
               })
            } else {
                callback(null, null);
            }
        }
    });
};




exports.addDoctor = function (msg, callback) {

    var email = msg.email;
    var userDetails = new User();

    userDetails.firstname = msg.firstname;
    userDetails.lastname = msg.lastname;
    userDetails.email = msg.email;
    userDetails.password = msg.password;
    userDetails.gender = msg.gender;
    userDetails.address = msg.address;
    userDetails.speciality = msg.speciality;
    userDetails.phonenumber = msg.phonenumber;
    userDetails.ssn = ssn.generate();
    userDetails.usertype = "doctor";


    User.findOne({email: email}, function (err, result) {
        if (err) {
            callback(err, null);

        }
        console.log(result);
        if (!result) {
            userDetails.save(function (err) {

                if (err) {

                    callback(err, null);
                }
                else {

                    callback(null, userDetails);
                }
            });
        }
        if (result) {
            callback(null, null);
        }
    });
};

exports.doctorList = function(msg, callback){
    User.find({usertype: "doctor"},{firstname:1,lastname:1}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null,null);
        }
        if (result) {
            callback(null, result);
        }
    });
};

exports.addAdmin = function (msg, callback) {

    var email = msg.email;
    var userDetails = new User();

    userDetails.firstname = msg.firstname;
    userDetails.lastname = msg.lastname;
    userDetails.email = msg.email;
    userDetails.password = msg.password;
    userDetails.gender = msg.gender;
    userDetails.address = msg.address;
    userDetails.phonenumber = msg.phonenumber;
    userDetails.ssn = ssn.generate();
    userDetails.usertype = "admin";

    User.findOne({email: email}, function (err, result) {
        if (err) {
            callback(err, null);

        }
        console.log(result);
        if (!result) {
            userDetails.save(function (err) {

                if (err) {

                    callback(err, null);
                }
                else {
                    callback(null, userDetails);
                }
            });
        }
        if (result) {
            callback(null, null);
        }
    });
};

exports.addNurse = function (msg, callback) {

    var email = msg.email;
    var userDetails = new User();

    userDetails.firstname = msg.firstname;
    userDetails.lastname = msg.lastname;
    userDetails.email = msg.email;
    userDetails.password = msg.password;
    userDetails.gender = msg.gender;
    userDetails.address = msg.address;
    userDetails.phonenumber = msg.phonenumber;
    userDetails.ssn = ssn.generate();
    userDetails.usertype = "nurse";

    User.findOne({email: email}, function (err, result) {
        if (err) {
            callback(err, null);

        }
        console.log(result);
        if (!result) {
            userDetails.save(function (err) {

                if (err) {

                    callback(err, null);
                }
                else {
                    callback(null, userDetails);
                }
            });
        }
        if (result) {
            callback(null, null);
        }
    });
};

exports.addPatient = function (msg, callback) {

    var patientId = new ObjectId(msg.patientId);
    var doctorId = msg.doctorId;

    var patientDetails = {
        firstname : msg.firstname,
        lastname : msg.lastname,
        email : msg.email,
        gender : msg.gender,
        address : msg.address,
        phonenumber : msg.phonenumber,
        age:msg.age,
        usertype : "patient"
    };


    var query = {_id: patientId};
    var options = { upsert: true, new: true, setDefaultsOnInsert: true };

    User.findOneAndUpdate(query, patientDetails, options, function (err, patient) {
        if (err) callback(err, null);
        if(patient){

            var patientFile = {
                patientId:patient._id,
                disease:msg.disease,
                dischargeNote:msg.dischargeNote,
                isReadmitted:msg.isReadmitted,
                last_admission_date:msg.last_admission_date,
                doctorId:msg.doctorId,
                admissionType:msg.admissionType
            };
            var query = {patientId: patientId};
            var options = { upsert: true, new: true, setDefaultsOnInsert: true };
            PatientFile.findOneAndUpdate(query, patientFile, options, function (err, patientFile){
                if (err) callback(err, null);
                if(patientFile){
                    var followupPlans = new Followup();
                    followupPlans.patientFileId = patientFile._id;
                    followupPlans.patientId = patientFile.patientId;
                    followupPlans.doctorId = patientFile.doctorId;
                    followupPlans.status = msg.status;
                  //  followupPlans.dueDate = +patientFile.dischargeDate + 2*24*60*60*1000;

                    followupPlans.save(function (err) {
                        if (err) {
                            callback(err, null);
                        }
                        else {
                            callback(null, followupPlans);
                        }
                    });
                }
            });
        }
    });
};

exports.notes = function (msg, callback) {

    var usertype = msg.usertype;
    var id = msg.userId;

    User.findOne({_id: id, usertype:usertype},{notes:1}, function (err, result) {
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


exports.updateNotes = function(msg,callback){

    var usertype = msg.usertype;
    var id = msg.userId;
    var notes = msg.notes;
    User.findOneAndUpdate({_id: new ObjectId(id), usertype:usertype},{$set: { notes: notes }}, function (err, result) {
        console.log(result);
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

exports.addNote = function(msg,callback){

    var id = new ObjectId(msg.userId);
    var usertype = msg.usertype;
    var note = {
        subject : msg.subject,
        date: msg.date,
        details: msg.details
    }

    User.findOneAndUpdate({_id: id, usertype:usertype},{$push: {"notes": note}}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        console.log(result);
        if (!result) {
            callback(null, null);
        }
        if (result) {
            callback(null, result);
        }
    });
};

exports.uploadVideo = function (msg, callback) {
    var userId = msg.userId;
    var fileName = msg.fileName;

    User.findOneAndUpdate({_id: userId},{$push: {"videos": fileName}}, function (err, result) {
        if (err) {
            callback(err, null);
        }
        console.log(result);
        if (!result) {
            callback(null, null);
        }
        if (result) {
            callback(null, result);
        }
    });
};