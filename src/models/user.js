// by Rafael Balestrini
// Code needed to read and write user data to glc database from within the application.

const mongoose = require('mongoose');

const opts = { timestamps: true };

const userSchema = new mongoose.Schema(
  {
    username: {type: String, required: true, index: { unique: true }},
    email: {type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    access: {type: Number, required: true}
  },
  opts
);

const User = mongoose.model('User', userSchema);
module.exports = User;
