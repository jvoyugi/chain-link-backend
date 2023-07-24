let mongoose = require("mongoose");
let validator = require('validator');


let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: value => { return validator.isEmail(value); }
  },
  fullName: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: value => { return validator.isMobilePhone(value); }
  },
  password: {
    type: String
  }
});
module.exports = mongoose.model('User', userSchema);