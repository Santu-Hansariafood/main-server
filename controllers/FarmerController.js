const FarmerRegister = require('../models/farmerRegisterModel');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');

exports.registerFarmer = async (req, res) => {
  try {
    const {
      name, fatherName, mobile, email, state, district,
      policeStation, village, pinCode, adherNumber, panNumber,
      gstNumber, accountNumber, ifscNumber, branchName, accountHolderName,
      bankName, password
    } = req.body;

    const existingFarmer = await FarmerRegister.findOne({ name, adherNumber });
    if (existingFarmer) {
      return res.status(400).json({ message: 'Farmer already registered with the same name and Aadhaar number.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const files = req.files;
    console.log("Files received:", files);

    const saveFilesLocally = async () => {
      const savedFiles = {};
      if (files['profilePhoto'] && files['profilePhoto'][0]) {
        const filePath = path.join(__dirname, '../uploads', files['profilePhoto'][0].originalname);
        fs.copyFileSync(files['profilePhoto'][0].path, filePath);
        savedFiles.profilePhoto = filePath;
      }
      if (files['adherCardPhoto'] && files['adherCardPhoto'][0]) {
        const filePath = path.join(__dirname, '../uploads', files['adherCardPhoto'][0].originalname);
        fs.copyFileSync(files['adherCardPhoto'][0].path, filePath);
        savedFiles.adherCardPhoto = filePath;
      }
      if (files['panCardPhoto'] && files['panCardPhoto'][0]) {
        const filePath = path.join(__dirname, '../uploads', files['panCardPhoto'][0].originalname);
        fs.copyFileSync(files['panCardPhoto'][0].path, filePath);
        savedFiles.panCardPhoto = filePath;
      }
      if (files['bankCardPhoto'] && files['bankCardPhoto'][0]) {
        const filePath = path.join(__dirname, '../uploads', files['bankCardPhoto'][0].originalname);
        fs.copyFileSync(files['bankCardPhoto'][0].path, filePath);
        savedFiles.bankCardPhoto = filePath;
      }
      if (files['gstCardPhoto'] && files['gstCardPhoto'][0]) {
        const filePath = path.join(__dirname, '../uploads', files['gstCardPhoto'][0].originalname);
        fs.copyFileSync(files['gstCardPhoto'][0].path, filePath);
        savedFiles.gstCardPhoto = filePath;
      }
      return savedFiles;
    };

    const savedFiles = await saveFilesLocally();

    const newFarmer = new FarmerRegister({
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
      ...savedFiles,
    });

    await newFarmer.save();
    res.status(201).json({ message: 'Farmer registered successfully', farmer: newFarmer });
  } catch (error) {
    console.error("Error during farmer registration:", error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
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

const readAndConvertToBase64 = (imagePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(imagePath, { encoding: 'base64' }, (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
