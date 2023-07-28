let mongoose = require("mongoose");
const Schema = mongoose.Schema

let businessSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true
  },
  accountNumber: {
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
  dateAdded: {
    type: Date,
    required: true
  },
  dateEdited: {
    type: Date,
    required: true
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
});
module.exports = mongoose.model('Business', businessSchema);