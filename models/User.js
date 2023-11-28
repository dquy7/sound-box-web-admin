// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // Thêm các trường khác nếu cần
});

const User = mongoose.model("User", userSchema);

module.exports = User;
