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
    type: Number
  },
  password: {
    type: String,
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
  },
  picture:{
    type:String,
    default:"https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?w=740&t=st=1696077818~exp=1696078418~hmac=485f46cbe800d22ce26e0fef07fd93a343bcce09ba1419555c1e46ec3e40eacf",
  }
});
const User = mongoose.model("user", UserSchema);
User.createIndexes();
module.exports = mongoose.model("user", UserSchema);
