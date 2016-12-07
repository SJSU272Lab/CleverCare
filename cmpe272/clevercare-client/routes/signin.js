
var bcrypt = require('bcryptjs');
var express = require('express');

var ejs = require("ejs");
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");



exports.authenticateUser = function (req, res, next) {

	var username = req.body.email;
	var password = req.body.password;

    console.log("in signin");

    var msg_payload = {username:username,password:password};
    mq_client.make_request('login_queue',msg_payload, function(err,results){
        console.log(results);
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
            res.json({
                success: true,
                message: 'Logged in',
                type: results.usertype
            });
            res.end();

        }
    });
};

exports.signout = function (req, res) {
    req.session.destroy();
    res.redirect("/");

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
        phonenumber:req.body.phone,
        gender:req.body.gender,
        method:"addDoc"

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
        phonenumber:req.body.phone,
        gender:req.body.gender,
        method:"addNurse"
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

    console.log(req.body.dischargeNote);
    var msg_payload = {
        patientId: req.body.patientId,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        phonenumber:req.body.phone,
        gender:req.body.gender,
        age:req.body.age,
        disease:req.body.disease,
        dischargeNote:req.body.dischargeNote,
        dischargeDate:req.body.dischargeDate,
        isReadmitted:req.body.isReadmitted,
        last_admission_date:req.body.last_admission_date,
        doctorId:req.body.doctorId,
        method:"addPatient"
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

exports.noOfNotes = function (req, res) {

    var msg_payload = {
        userId: req.params.userId,
        usertype: req.query.usertype
    };

    console.log(msg_payload);
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




