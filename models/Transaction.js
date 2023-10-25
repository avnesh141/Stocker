const mongoose = require("mongoose");
const { Schema } = mongoose;
const TransactSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  company: {
    type: String,
    requireed: true,
    unique: false,
  },
  type: {
    type: String,
    requireed: true,
    unique: false,
  },
  price: {
    type: Number,
    required: true,
    unique: false,
  },
  number: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  t_id: {
    type: String,
    default: `TTCN${parseInt(Math.random()*9999999+100000000)}`,
    required: true,
  },
});
const Transact = mongoose.model("transact", TransactSchema);
Transact.createIndexes();
module.exports = mongoose.model("transact", TransactSchema);
