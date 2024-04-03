const mongoose = require("mongoose");

const farmerRegisterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    policeStation: {
      type: String,
      required: true,
    },
    village: {
      type: String,
      required: true,
    },
    pinCode: {
      type: String,
      required: true,
    },
    adherNumber: {
      type: String,
      required: true,
    },
    panNumber: {
      type: String,
      required: true,
    },
    gstNumber: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscNumber: {
      type: String,
      required: true,
    },
    branchName: {
      type: String,
      required: true,
    },
    accountHolderName: {
      type: String,
      required: true,
    },
    bankName: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      required: true,
    },
    gstCardPhoto: {
      type: String,
      required: true,
    },
    panCardPhoto: {
      type: String,
      required: true,
    },
    adherCardPhoto: {
      type: String,
      required: true,
    },
    bankCardPhoto: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

farmerRegisterSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Duplicate key error"));
  } else {
    next(error);
  }
});

const FarmerRegister = mongoose.model("FarmerRegister", farmerRegisterSchema);

module.exports = FarmerRegister;
