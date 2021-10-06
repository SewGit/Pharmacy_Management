const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Prescription = new Schema( {
  id: {type: String},
  medName: { type: String },
  docName: { type: String },
  instructions: { type: String },
  patientName: { type: String },
  dosage: { type: String },
  date: { type: Date },
  quantity: { type: Number },
  price: { type: Number },
  grossTotal: { type: Number },
});

module.exports = mongoose.model ('Prescription', Prescription);