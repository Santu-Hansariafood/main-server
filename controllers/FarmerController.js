const FarmerRegister = require('../models/farmerRegisterModel');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const readAndConvertToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64String = Buffer.from(data).toString('base64');
        resolve(base64String);
      }
    });
  });
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

    // Check if farmer with the same name and Aadhaar number already exists
    const existingFarmer = await FarmerRegister.findOne({
      name,
      adherNumber,
    });

    if (existingFarmer) {
      return res.status(400).json({ message: 'Farmer already registered with the same name and Aadhaar number.' });
    }

    const profilePhotoPath = req.files['profilePhoto']?.[0]?.path || null;
    const adherCardPhotoPath = req.files['adherCardPhoto']?.[0]?.path || null;
    const panCardPhotoPath = req.files['panCardPhoto']?.[0]?.path || null;
    const bankCardPhotoPath = req.files['bankCardPhoto']?.[0]?.path || null;
    const gstCardPhotoPath = req.files['gstCardPhoto']?.[0]?.path || null;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

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
      password: hashedPassword,
      profilePhoto: profilePhotoPath,
      adherCardPhoto: adherCardPhotoPath,
      panCardPhoto: panCardPhotoPath,
      bankCardPhoto: bankCardPhotoPath,
      gstCardPhoto: gstCardPhotoPath,
    });

    res.status(201).json({ msg: 'New farmer registered successfully.', data: newFarmer });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Other existing functions remain unchanged

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
      res.status(404).send('Farmer not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { mobileNumber, password } = req.body;

  try {
    const farmer = await FarmerRegister.findOne({ mobile: mobileNumber });

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const payload = {
      farmer: {
        id: farmer.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getAllFarmers = async (req, res) => {
  try {
    const farmers = await FarmerRegister.find();

    if (!farmers || farmers.length === 0) {
      return res.status(404).json({ message: 'No farmers found' });
    }

    res.status(200).json({ farmers });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
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
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ updatedFarmer });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteFarmer = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFarmer = await FarmerRegister.findByIdAndDelete(id);

    if (!deletedFarmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    res.status(200).json({ message: 'Farmer deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFarmerById = async (req, res) => {
  const { id } = req.params;

  try {
    const farmer = await FarmerRegister.findById(id);

    if (!farmer) {
      return res.status(404).json({ message: 'Farmer not found' });
    }

    const profilePhotoBase64 = await readAndConvertToBase64(farmer.profilePhoto);
    const gstCardPhotoBase64 = await readAndConvertToBase64(farmer.gstCardPhoto);
    const panCardPhotoBase64 = await readAndConvertToBase64(farmer.panCardPhoto);
    const adherCardPhotoBase64 = await readAndConvertToBase64(farmer.adherCardPhoto);
    const bankCardPhotoBase64 = await readAndConvertToBase64(farmer.bankCardPhoto);

    const farmerData = {
      ...farmer._doc,
      profilePhotoBase64,
      gstCardPhotoBase64,
      panCardPhotoBase64,
      adherCardPhotoBase64,
      bankCardPhotoBase64,
    };

    res.status(200).json({ farmer: farmerData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.checkMobileNumber = async (req, res) => {
  try {
    const { query } = req.params;
    const farmer = await FarmerRegister.findOne({ 
      $or: [{ mobile: query }, { name: query }] 
    });

    if (farmer) {
      return res.status(200).json({ message: 'Farmer found', farmerId: farmer._id });
    } else {
      return res.status(404).json({ message: 'Farmer not found' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getFarmerPurchaseBill = async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await FarmerRegister.findById(id);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.status(200).json({
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
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
