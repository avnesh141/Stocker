const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: {
    type: String,
    requireed: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: false,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: false,
  },
  date: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  amount: {
    type: Number,
    default:1000000,
  }
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = mongoose.model("user", UserSchema);
