let mongoose = require("mongoose");
let validator = require('validator');
const Schema = mongoose.Schema


let transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
  },
  businessName: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'businesses'
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  }
});
module.exports = mongoose.model('Transaction', transactionSchema);