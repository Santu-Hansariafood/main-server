const mongoose = require("mongoose");

const employeeRegisterSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter a valid name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter a valid last name"],
    },
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
    confirmPassword: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeRegisterSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Duplicate key error"));
  } else {
    next(error);
  }
});

const EmployeeRegister = mongoose.model(
  "EmployeeRegister",
  employeeRegisterSchema
);

module.exports = EmployeeRegister;
