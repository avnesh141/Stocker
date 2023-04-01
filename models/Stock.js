const mongoose = require("mongoose");
const { Schema } = mongoose;
const StockSchema = new Schema({
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
});
const Stock = mongoose.model("stock", StockSchema);
Stock.createIndexes();
module.exports = mongoose.model("stock", StockSchema);
