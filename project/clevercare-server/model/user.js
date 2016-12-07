var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    ssn: {type: String},
    firstname: {type: String},
    lastname: {type: String},
    password: {type: String},
    email: {type: String},
    address: {type: String,default:''},
    city: {type: String,default:''},
    state: {type: String,default:''},
    zip: {type: String,default:''},
    phonenumber: {type: String,default:''},
    profileimage: {type: String,default:''},
    usertype: {type: String},
    age: {type: Number,default:''},
    speciality: {type: String,default:''},
    gender: {type: String,default:''},
    notes:{type:[String],default:''},
    createdate:{type: Date, default: Date.now }
});

var User = mongoose.model('user', userSchema, 'user');
module.exports = User;