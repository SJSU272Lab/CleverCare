var bcrypt = require('bcryptjs');
var express = require('express');

var ejs = require("ejs");
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");


exports.authenticateUser = function (req, res) {

    var username = req.body.email;
    var password = req.body.password;

    var msg_payload = {username: username, password: password};
    mq_client.make_request('login_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in authetication.'
            });
            res.end();
        }
        if (!results) {
            res.json({
                success: false,
                message: 'Password doesn\'t match'
            });
            res.end();
        }
        if (results) {
            req.session.userId = results._id;
            req.session.usertype = results.usertype;
            var data = {
                success: true,
                message: 'Logged in',
                usertype: results.usertype,
                userId: results._id,
                videos: results.videos
            };
            res.json(data);
            res.end();
        }
    });
};

exports.signout = function (req, res) {
    req.session.destroy();
    res.json({
        success:true
    });
    res.end();

};


exports.addDoctor = function (req, res) {

    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(req.body.password, salt);

    var msg_payload = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: passwordToSave,
        speciality: req.body.speciality,
        address: req.body.address,
        phonenumber: req.body.phone,
        gender: req.body.gender,
        method: "addDoc"

    };

    mq_client.make_request('register_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            console.log(results);
            res.json({
                success: true,
                message: 'Registered'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });
};


exports.doctorList = function (req, res) {

    var msg_payload = {};

    mq_client.make_request('doctor_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing doctor.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'doctor list not exists'
            });
            res.end();
        }
    });
};

exports.addAdmin = function (req, res) {

    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(req.body.password, salt);

    var msg_payload = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: passwordToSave,
        address: req.body.address,
        phonenumber: req.body.phone,
        gender: req.body.gender,
        method: "addAdmin"
    };

    mq_client.make_request('register_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            console.log(results);
            res.json({
                success: true,
                message: 'Registered'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });
};


exports.addNurse = function (req, res) {

    var salt = bcrypt.genSaltSync(10);
    var passwordToSave = bcrypt.hashSync(req.body.password, salt);

    var msg_payload = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: passwordToSave,
        address: req.body.address,
        phonenumber: req.body.phone,
        gender: req.body.gender,
        method: "addNurse"
    };

    mq_client.make_request('register_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            console.log(results);
            res.json({
                success: true,
                message: 'Registered'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });
};


exports.addPatient = function (req, res) {

    var msg_payload = {
        patientId: req.body.patientId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phonenumber: req.body.phone,
        gender: req.body.gender,
        age: req.body.age,
        disease: req.body.disease,
        dischargeNote: req.body.dischargeNote,
        dischargeDate: req.body.dischargeDate,
        isReadmitted: req.body.isReadmitted,
        last_admission_date: req.body.last_admission_date,
        doctorId: req.body.doctorId,
        admissionType: req.body.admissionType,
        status:(req.body.status) ? req.body.status:"Followup required",
        method: "addPatient"
    };

    mq_client.make_request('register_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            res.json({
                success: true,
                message: 'Registered'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });
};

exports.noOfNotes = function (req, res) {

    var msg_payload = {
        userId: req.params.userId,
        usertype: req.query.usertype,
        method:"noOfNotes"
    };

    mq_client.make_request('notes_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            delete results._id;
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });

};


exports.updateNotes = function (req, res) {

    var msg_payload = {
        userId: req.body.userId,
        usertype: req.body.usertype,
        notes:req.body.notes,
        method:"updateNotes"
    };

    mq_client.make_request('notes_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });

};


exports.addNote = function (req, res) {

    var msg_payload = {
        userId:req.body.userId,
        usertype:req.body.usertype,
        subject: req.body.subject,
        date: new Date(),
        details: req.body.details,
        method:"addNote"
    };
    mq_client.make_request('notes_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in registration.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'User exist'
            });
            res.end();
        }
    });

};


