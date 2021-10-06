const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Medicine = new Schema( {
  id: {type: String},
  medName: { type: String, required: true },
  medCategory: { type: String, required: true },
  medEffects: { type: String, required: true },
  quantity: { type: Number, required: true },
  company: { type: String, required: true },
  storeBox: { type: String, required: true },
  purchasePrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  expDate: { type: Date },
});

module.exports = mongoose.model ('Medicine', Medicine);