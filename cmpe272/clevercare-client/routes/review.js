var express = require('express');

var ejs = require("ejs");
var fecha = require('fecha');
var TMClient = require('textmagic-rest-client');
var mq_client = require("../rpc/client.js");

exports.listFollowUpForReview = function (req, res) {

    var msg_payload = {
        method: "listing_followup_for_review"
    };

    mq_client.make_request('review_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing followups.'
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
                message: 'No followup exist'
            });
            res.end();
        }
    });
};

exports.listFollowUpForCriticalReview = function (req, res) {

    var msg_payload = {
        method: "listing_critical_followup_for_review"
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

exports.listFollowUpTotalForReview = function (req, res) {

    "use strict";
    var msg_payload = {
        method: "listing_followup_total_for_review"
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

exports.submitReview = function (req, res) {

    var msg_payload = {
        followupId: req.body.followupId,
        notes: req.body.notes,
        reviewed_by: req.body.doctorId, //use from session when actual implementation
        method: "submit_review"
    };

    mq_client.make_request('review_queue', msg_payload, function (err, results) {
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


exports.listReviewedFollowupByPatient = function (req, res) {

    var msg_payload = {
        patientId: req.params.patientId,
        method: "listing_reviewed_followup_by_patient"
    };

    mq_client.make_request('review_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in listing reviews.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No review exist'
            });
            res.end();
        }
    });
};

exports.sendNote = function (req, res) {

    var msg_payload = {
        email: req.body.email,
        subject: req.body.subject,
        note: req.body.note
    };


    /*  var c = new TMClient('darshitthesiya', 'u4K6Qjin65pIZo5IHE5zmr79hXZBPB');
     // var c = new TMClient('username', 'C7XDKZOQZo6HvhJwtUw0MBcslfqwtp4');

     c.Messages.send({text: 'test message', phones:'+16692046480'}, function(err, res){
     console.log('Messages.send()', err, res);
     // res.send(res);
     // res.end();
     });*/

    mq_client.make_request('sms_queue', msg_payload, function (err, results) {
        if (err) {
            res.json({
                success: false,
                message: 'Error in sending note.'
            });
            res.end();
        }
        if (results) {
            res.send(results);
            res.end();
        } else {
            res.json({
                success: false,
                message: 'No note sent'
            });
            res.end();
        }
    });
};

