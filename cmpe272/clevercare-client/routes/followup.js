var express = require('express');

var ejs = require("ejs");
var fecha = require('fecha');
var mq_client = require("../rpc/client.js");


exports.listFollowUp = function (req, res) {

    var msg_payload = {
        method: "listing_followup"
    };

    mq_client.make_request('followup_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing followups.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No followup exist'
            });
            res.end();
        }
    });
};

exports.listCriticalFollowUp = function (req, res) {

    var msg_payload = {
        method: "listing_critical_followup"
    };

    mq_client.make_request('critical_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing followups.'
            });
            res.end();
        }
        if (results) {
            console.log(results.length);
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No followup exist'
            });
            res.end();
        }
    });
};


exports.listFollowUpTotal = function (req, res) {

    "use strict";
    var msg_payload = {
        method: "listing_followup_total"
    };

    mq_client.make_request('followup_analytic_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing total followups.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No total followup exist'
            });
            res.end();
        }
    });
};


exports.submitFollowup = function (req, res) {

    var record = {};
    record.age = req.body.age;
    record.gender = req.body.gender;

    var msg_payload = {
        followupId: req.body.followupId,
        percentage: req.body.percentage,
        notes: req.body.notes,
        taken_by: req.body.nurseId, //use from session when actual implementation
        record: record,
        method: "submit_followup"
    };

    mq_client.make_request('followup_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in submitting followups.'
            });
            res.end();
        }
        if (results) {
            console.log(results);
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'followup not submitted'
            });
            res.end();
        }
    });
};

exports.listFollowUpByPatient = function (req, res) {

    var msg_payload = {
        patientId: req.params.patientId,
        method: "list_followup_bypatient"
    };

    mq_client.make_request('followup_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing followups.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No followup exist'
            });
            res.end();
        }
    });
};

exports.scheduleFollowup = function (req, res) {

    var msg_payload = {
        patientId: req.body.patientId,
        doctorId: req.body.doctorId,
        patientFileId: req.body.patientFileId,
        method: "schedule_followup"
    };

    mq_client.make_request('followup_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in scheduling followup.'
            });
            res.end();
        }
        if (results) {
            res.json({
                success: true,
                message: 'followup scheduled'
            });
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No scheduled followup'
            });
            res.end();
        }
    });
};

