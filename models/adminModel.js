const mongoose = require("mongoose");

const adminRegisterSchema = mongoose.Schema({
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

adminRegisterSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Duplicate key error"));
  } else {
    next(error);
  }
});

const AdminRegister = mongoose.model("AdminRegister", adminRegisterSchema);

module.exports = AdminRegister;
