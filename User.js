const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  dob: Date
});

module.exports = mongoose.model("User", userSchema);
