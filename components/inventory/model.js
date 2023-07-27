let mongoose = require("mongoose");
const Schema = mongoose.Schema
let inventorySchema = new mongoose.Schema({
  businessName: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'businesses'
  },
  name: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  addedBy: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'users'
  },
});
module.exports = mongoose.model('Inventory', inventorySchema);