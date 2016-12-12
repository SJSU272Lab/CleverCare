var mq_client = require("../rpc/client.js");

exports.uploadVideo = function (request, response) {
    var fileName = Date.now() + request.session.userId + '.mp4';
    var video = request.files.file;
    video.mv('../public/videos/' + fileName, function (err) {
        if (err) {
            console.log(err);
            response.send({statusCode: 401});
        } else {
            var msg_payload = {fileName: fileName, userId: request.session.userId};
            mq_client.make_request('uploadvideo_queue', msg_payload, function (err, results) {
                if (err) {
                    response.send({statusCode: 401, url: fileName});
                } else {
                    response.send({statusCode: 200, url: fileName});
                }
            });
        }
    });
}
