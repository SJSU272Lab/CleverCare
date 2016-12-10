var fecha = require('fecha');
var mq_client = require("../rpc/client.js");


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
