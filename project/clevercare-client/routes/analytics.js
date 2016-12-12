var fecha = require('fecha');
var mq_client = require("../rpc/client.js");


exports.doctorAnalysis = function (req, res) {

    var msg_payload = {
        method: "doctorAnalysis"
    };

    mq_client.make_request('analytics_queue', msg_payload, function (err, results) {
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

exports.predictionAnalysis = function (req, res) {

    var msg_payload = {
        method: "predictionAnalysis"
    };

    mq_client.make_request('analytics_queue', msg_payload, function (err, results) {
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
