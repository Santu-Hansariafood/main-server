const FarmerRegister = require("../models/farmerRegisterModel");
const fs = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(fs.readFile);

const readAndConvertToBase64 = async (filePath) => {
  if (!filePath) return null;
  try {
    const data = await readFileAsync(filePath);
    return Buffer.from(data).toString("base64");
  } catch (error) {
    throw new Error("Failed to read file");
  }
};

exports.registerFarmer = async (req, res) => {
  try {
    const {
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      policeStation,
      village,
      pinCode,
      adherNumber,
      panNumber,
      gstNumber,
      accountNumber,
      ifscNumber,
      branchName,
      accountHolderName,
      bankName,
      password,
    } = req.body;

    const profilePhotoPath = req.files["profilePhoto"]?.[0]?.path || null;
    const adherCardPhotoPath = req.files["adherCardPhoto"]?.[0]?.path || null;
    const panCardPhotoPath = req.files["panCardPhoto"]?.[0]?.path || null;
    const bankCardPhotoPath = req.files["bankCardPhoto"]?.[0]?.path || null;
    const gstCardPhotoPath = req.files["gstCardPhoto"]?.[0]?.path || null;

    const newFarmer = await FarmerRegister.create({
      name,
      fatherName,
      mobile,
      email,
      state,
      district,
      policeStation,
      village,
      pinCode,
      adherNumber,
      panNumber,
      gstNumber,
      accountNumber,
      ifscNumber,
      branchName,
      accountHolderName,
      bankName,
      password,
      profilePhoto: profilePhotoPath,
      adherCardPhoto: adherCardPhotoPath,
      panCardPhoto: panCardPhotoPath,
      bankCardPhoto: bankCardPhotoPath,
      gstCardPhoto: gstCardPhotoPath,
    });

    res
      .status(201)
      .json({ msg: "New farmer registered successfully.", data: newFarmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  const { mobileNumber, aadhaarNumber } = req.body;

  try {
    const farmer = await FarmerRegister.findOne({
      mobile: mobileNumber,
      adherNumber: aadhaarNumber,
    });
    if (farmer) {
      res.json({ password: farmer.password });
    } else {
      res.status(404).send("Farmer not found");
    }
  } catch (error) {
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const farmer = await FarmerRegister.findOne({ mobile: mobileNumber });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    if (farmer.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ success: true, farmer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFarmers = async (req, res) => {
  try {
    const farmers = await FarmerRegister.find();

    if (!farmers || farmers.length === 0) {
      return res.status(404).json({ message: "No farmers found" });
    }

    res.status(200).json({ farmers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.updateFarmer = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    const updatedFarmer = await FarmerRegister.findByIdAndUpdate(id, newData, {
      new: true,
    });

    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ updatedFarmer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteFarmer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFarmer = await FarmerRegister.findByIdAndDelete(id);

    if (!deletedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({ message: "Farmer deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getFarmerDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await FarmerRegister.findById(id);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const farmerDetails = {
      _id: farmer._id,
      name: farmer.name,
      fatherName: farmer.fatherName,
      mobile: farmer.mobile,
      email: farmer.email,
      state: farmer.state,
      district: farmer.district,
      policeStation: farmer.policeStation,
      village: farmer.village,
      pinCode: farmer.pinCode,
      adherNumber: farmer.adherNumber,
      panNumber: farmer.panNumber,
      gstNumber: farmer.gstNumber,
      accountNumber: farmer.accountNumber,
      ifscNumber: farmer.ifscNumber,
      branchName: farmer.branchName,
      accountHolderName: farmer.accountHolderName,
      bankName: farmer.bankName,
      password: farmer.password,
      profilePhoto: await readAndConvertToBase64(farmer.profilePhoto),
      gstCardPhoto: await readAndConvertToBase64(farmer.gstCardPhoto),
      panCardPhoto: await readAndConvertToBase64(farmer.panCardPhoto),
      adherCardPhoto: await readAndConvertToBase64(farmer.adherCardPhoto),
      bankCardPhoto: await readAndConvertToBase64(farmer.bankCardPhoto),
    };

    res.json(farmerDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
