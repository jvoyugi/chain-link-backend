let mongoose = require("mongoose");
let validator = require('validator');


let transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model('Transaction', transactionSchema);