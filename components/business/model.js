let mongoose = require("mongoose");

let businessSchema = new mongoose.Schema({
  business: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  account_number: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    required: true
  },
  date_added: {
    type: Date,
    required: true
  },
  date_edited: {
    type: Date,
    required: true
  }
});
module.exports = mongoose.model('Business', businessSchema);