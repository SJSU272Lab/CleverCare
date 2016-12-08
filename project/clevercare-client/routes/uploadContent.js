

var mq_client = require("../rpc/client.js");

exports.uploadVideo = function (request, response) {
    var fileName = Date.now() + request.session.userId + '.mp4';
    var video = request.files.file;
    video.mv('../public/videos/' + fileName, function (err) {
        if (err) {
            console.log(err);
            response.send({statusCode: 401});
        } else {
            response.send({statusCode: 200, url: fileName});
        }
    });
}
