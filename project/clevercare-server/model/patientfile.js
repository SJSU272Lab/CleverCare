var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var patientfileSchema = new Schema({
    patientId: {type: Schema.Types.ObjectId, ref: 'user'},
    disease: {type: String},
    dischargeNote: {type: String},
    dischargeDate: {type: Date, default: Date.now},
    isReadmitted: {type: Boolean,default: false},
    last_admission_date: {type: Date},
    doctorId: {type: Schema.Types.ObjectId, ref: 'user'},
    admissionType:{type:String,default:'Emergency'},
});

var Patientfile = mongoose.model('patientfile', patientfileSchema, 'patientfile');
module.exports = Patientfile;
