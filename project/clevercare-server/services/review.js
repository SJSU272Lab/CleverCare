var User = require('../model/user');
var PatientFile = require('../model/patientfile');
var Followup = require('../model/followup');
var mongoose = require('mongoose');
var TMClient = require('textmagic-rest-client');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var ObjectId = require('mongodb').ObjectID;
var https = require('https');

exports.listFollowUpForReview = function (msg, callback) {

    var today = new Date();
    Followup.find({isDone: true, isReviewed: false, "dueDate": {"$lte": today}})
        .sort('patientId')
        .populate('patientId')
        .populate('patientFileId')
        .populate('doctorId')
        .sort('dueDate')
        .exec(function (err, result) {
            if (err) {
                callback(err, null);
            }
            //console.log(result);
            if (!result) {
                callback(null, null);
            }
            if (result) {
                console.log(result.length);
                callback(null, result);
            }
        });
};

exports.listFollowUpForCriticalReview = function (msg, callback) {

    var today = new Date();
    Followup.find({isDone: true, isReviewed: false, "dueDate": {"$lte": today}})
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
exports.submitReview = function (msg, callback) {

    var query = {_id: new ObjectId(msg.followupId)};
    var notes = {
        note_by: new ObjectId(msg.reviewed_by),
        content: msg.notes
    }

    var reviewDetails = {//use from session when actual implementation
        $set: {reviewed_by: msg.reviewed_by, isReviewed: true}
    };
    if (notes.content) {
        reviewDetails.$push = {notes: notes};
    }
    Followup.findOneAndUpdate(query, reviewDetails, function (err, result) {
        if (err) {
            callback(err, null);
        }
        if (!result) {
            callback(null, null);
        }
        if (result) {
            console.log(result);
            callback(null, result);
        }
    });
};

exports.listFollowUpTotalForReview = function (msg, callback) {

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
                if (result[i].isReviewed == true && result[i].isDone == true) done++;
                else if (result[i].isReviewed == false && result[i].isDone == true) notDone++;
            }
            var response = {
                done: done,
                notDone: notDone
            };
            callback(null, response);
        }
    });
};

exports.listReviewedFollowupByPatient = function (msg, callback) {

    Followup.find({patientId: msg.patientId, isDone: true, isReviewed:true})
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


exports.sendNote = function (msg, callback) {

    /* var c = new TMClient('darshitthesiya', 'u4K6Qjin65pIZo5IHE5zmr79hXZBPB');
     c.Messages.send({text: msg.note, phones:msg.phonenumber}, function(err, res){
     console.log('Messages.send()', err, res);
     callback(null,res);
     });*/

    var transport = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        auth: {
            user: 'vicky.miyani@gmail.com', // my mail
            pass: 'vnv_8300'
        }
    }));

    var mailOptions = {
        from: 'vicky.miyani@gmail.com', // sender address
        to: msg.email, // list of receivers
        subject: msg.subject, // Subject line
        text: msg.note //, // plaintext body
        // html: '<b>Hello world ✔</b>' // You can choose to send an HTML body instead
    };

    transport.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            callback(error, null);
        } else {
            console.log('Message sent: ' + info.response);
            response = {
                success:true
            }
            callback(null, response);
        }
        ;
    });


    /*var data = JSON.stringify({
     api_key: 'cda21463',
     api_secret: '44bfc65740cb602e',
     to: '16692046352',
     from: '16692046480',
     text: 'Hello from vikas'
     });

     var options = {
     host: 'rest.nexmo.com',
     path: '/sms/json',
     port: 443,
     method: 'POST',
     headers: {
     'Content-Type': 'application/json',
     'Content-Length': Buffer.byteLength(data)
     }
     };

     var req = https.request(options);

     req.write(data);
     req.end();

     var responseData = '';
     req.on('response', function(res){
     res.on('data', function(chunk){
     responseData += chunk;
     });
     res.on('end', function(){
     console.log(JSON.parse(responseData));
     callback(null,responseData);
     });
     });*/
};