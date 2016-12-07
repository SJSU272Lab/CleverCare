var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var followupSchema = new Schema({
    patientFileId: {type: Schema.Types.ObjectId, ref: 'patientfile'},
    patientId: {type: Schema.Types.ObjectId, ref: 'user'},
    doctorId:{type: Schema.Types.ObjectId, ref: 'user'},
    dueDate:{type: Date, default:+new Date() + 2*24*60*60*1000},
    percentage: {type: Number,default: 0.0},
    isDone: {type: Boolean, default: false},
    isReviewed: {type: Boolean, default: false},
    notes:{type:[Schema.Types.Mixed],default:''},
    taken_by:{type: Schema.Types.ObjectId, ref: 'user'},
    reviewed_by: {type: Schema.Types.ObjectId, ref: 'user'},
    status: {type: String, default: ''},
    record: Schema.Types.Mixed

});

var Followup = mongoose.model('followup', followupSchema, 'followup');
module.exports = Followup;
