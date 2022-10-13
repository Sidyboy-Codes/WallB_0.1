const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// User schema

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: [true, "This email address already exist"],
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Please enter valid email address"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
});

// task before saving the user
UserSchema.pre("save", async function (next) {
  // we should not rehash the hashed password
  if (!this.isModified("password")) {
    // here next() is next middleware function
    next();
  }

  // generating salt (how many time password should get hashed)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// UserSchema methods
UserSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJWT = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// exporting schema
const User = mongoose.model("User", UserSchema);
module.exports = User;
