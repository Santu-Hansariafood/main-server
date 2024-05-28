require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const EmployeeRegister = require("./models/employeeRegisterModel");
const FarmerRegister = require("./models/farmerRegisterModel");
const AdminRegister = require("./models/adminModel");
const Buyer = require("./models/buyerModel");
const BuyerCompany = require("./models/buyerCompanyModel");
const SoyaQualityParameters = require("./models/soyaModel");
const Deal = require("./models/dealsModel");
const BrokenRiceQualityParameters = require("./models/brokenRiceQualityModel");
const MaizeQualityParameters = require("./models/maizeQualityModel");
const ParticipateOnBid = require("./models/participateOnBidModel");
const FarmerProduct = require('./models/farmerProductModel');
const PickupLocation = require('./models/pickupLocationModel');
const Order = require('./models/orderModel');
const Quality = require('./models/qualityModel');
const FarmerOrder = require("./models/farmerOrderModel");
const OrderByFarmer = require("./models/orderModelByFarmer");
const Godown = require("./models/godownModel");
const app = express();

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

app.post(
  "/registerFarmer",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "adherCardPhoto", maxCount: 1 },
    { name: "panCardPhoto", maxCount: 1 },
    { name: "bankCardPhoto", maxCount: 1 },
    { name: "gstCardPhoto", maxCount: 1 },
  ]),
  async (req, res) => {
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
      } = req.body;

      const profilePhotoPath = req.files["profilePhoto"][0].path;
      const adherCardPhotoPath = req.files["adherCardPhoto"][0].path;
      const panCardPhotoPath = req.files["panCardPhoto"][0].path;
      const bankCardPhotoPath = req.files["bankCardPhoto"][0].path;
      const gstCardPhotoPath = req.files["gstCardPhoto"][0].path;

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
  }
);

app.get("/registerFarmer", async (req, res) => {
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
});

app.put("/registerFarmer/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;

  try {
    // Find the farmer by ID and update their data
    const updatedFarmer = await FarmerRegister.findByIdAndUpdate(id, newData, {
      new: true, // Return the updated document
    });

    // If the farmer is not found, return a 404 status with an appropriate message
    if (!updatedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // If the farmer is found and updated successfully, return the updated data
    res.status(200).json({ updatedFarmer });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/registerFarmer/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the farmer by ID and delete them
    const deletedFarmer = await FarmerRegister.findByIdAndDelete(id);

    // If the farmer is not found, return a 404 status with an appropriate message
    if (!deletedFarmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // If the farmer is found and deleted successfully, return a success message
    res.status(200).json({ message: "Farmer deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/registerFarmer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await FarmerRegister.findById(id);

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const readAndConvertToBase64 = (filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const base64String = Buffer.from(data).toString("base64");
            resolve(base64String);
          }
        });
      });
    };

    const profilePhotoBase64 = await readAndConvertToBase64(
      farmer.profilePhoto
    );
    const gstCardPhotoBase64 = await readAndConvertToBase64(
      farmer.gstCardPhoto
    );
    const panCardPhotoBase64 = await readAndConvertToBase64(
      farmer.panCardPhoto
    );
    const adherCardPhotoBase64 = await readAndConvertToBase64(
      farmer.adherCardPhoto
    );
    const bankCardPhotoBase64 = await readAndConvertToBase64(
      farmer.bankCardPhoto
    );

    res.status(200).json({
      farmer: {
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
        profilePhoto: profilePhotoBase64,
        gstCardPhoto: gstCardPhotoBase64,
        panCardPhoto: panCardPhotoBase64,
        adherCardPhoto: adherCardPhotoBase64,
        bankCardPhoto: bankCardPhotoBase64,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/registerFarmer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const farmer = await FarmerRegister.findById(id);

    if (!farmer || !farmer.profilePhoto) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    // Function to read image file and convert to base64
    const readAndConvertToBase64 = (filePath) => {
      return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
          if (err) {
            reject(err);
          } else {
            const base64String = Buffer.from(data).toString("base64");
            resolve(base64String);
          }
        });
      });
    };

    // Prepare response object with farmer details
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
      profilePhoto: await readAndConvertToBase64(farmer.profilePhoto),
      gstCardPhoto: await readAndConvertToBase64(farmer.gstCardPhoto),
      panCardPhoto: await readAndConvertToBase64(farmer.panCardPhoto),
      adherCardPhoto: await readAndConvertToBase64(farmer.adherCardPhoto),
      bankCardPhoto: await readAndConvertToBase64(farmer.bankCardPhoto),
    };

    // Send response with farmer details
    res.status(200).json({ farmer: farmerDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/employeeRegister', async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const employee = await EmployeeRegister.findOne({ mobile });

    if (employee && employee.password === password) {
      res.json({ success: true, employee });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

// GET employeeRegister
app.get("/employeeRegister", async (req, res) => {
  try {
    const employeeRegisters = await EmployeeRegister.find();
    if (!employeeRegisters || employeeRegisters.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(employeeRegisters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employee by ID
app.get("/employeeRegister/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeRegister = await EmployeeRegister.findById(id);
    if (!employeeRegister) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get employee by mobile number
app.get("/employeeRegister/mobile/:mobile", async (req, res) => {
  try {
    const { mobile } = req.params;
    const employeeRegister = await EmployeeRegister.find({ mobile: mobile });
    if (!employeeRegister || employeeRegister.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//update the employeeRegister in to the Buyercompany

app.put("/employeeRegister/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeRegister = await EmployeeRegister.findByIdAndUpdate(
      id,
      req.body
    );
    if (!employeeRegister) {
      return res
        .status(404)
        .json({ message: `cannot find any Register with ID ${id}` });
    }
    const updatedemployeeRegister = await EmployeeRegister.findById(id);
    res.status(200).json(updatedemployeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a employeeRegister

app.delete("/employeeRegister/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeRegister = await EmployeeRegister.findByIdAndDelete(id);
    if (!employeeRegister) {
      return res
        .status(404)
        .json({ message: `cannot find any register with ID ${id}` });
    }
    res.status(200).json(employeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/adminRegister", async (req, res) => {
  try {
    const adminRegister = await AdminRegister.find({});
    res.status(200).json(adminRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Buyer api

app.get("/buyer", async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET buyer by ID
app.get("/buyer/:id", async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    res.json(buyer);
  } catch (error) {
    console.error("Error fetching buyer by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/buyer", async (req, res) => {
  try {
    const buyer = await Buyer.create(req.body);
    res.status(201).json(buyer);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

// PUT route to update buyer by ID
app.put("/buyer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findByIdAndUpdate(id, req.body, { new: true });

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.json(buyer);
  } catch (error) {
    console.error("Error updating buyer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// DELETE route to delete buyer by ID
app.delete("/buyer/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findByIdAndDelete(id);

    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }

    res.json({ message: "Buyer deleted successfully" });
  } catch (error) {
    console.error("Error deleting buyer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// buyer master

app.post(
  "/registerBuyerCompany",
  upload.fields([
    { name: "passbook", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        companyName,
        location,
        billingAddress,
        gstNo,
        panNo,
        accountNumber,
        accountHolderName,
        ifscCode,
        bankName,
        password,
      } = req.body;

      const passbook = req.files["passbook"][0].path;
      const gstCertificate = req.files["gstCertificate"][0].path;
      const panCard = req.files["panCard"][0].path;

      const newBuyerCompany = await BuyerCompany.create({
        companyName,
        location,
        billingAddress,
        gstNo,
        panNo,
        accountNumber,
        accountHolderName,
        ifscCode,
        bankName,
        password,
        passbook,
        gstCertificate,
        panCard,
      });

      res.status(201).json({
        msg: "New buyer company registered successfully.",
        data: newBuyerCompany,
      });
    } catch (error) {
      if (
        error.code === 11000 &&
        error.keyPattern &&
        error.keyPattern.companyName &&
        error.keyPattern.gstNo
      ) {
        return res
          .status(400)
          .send({ message: "Company name and GST number must be unique." });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

app.get("/registerBuyerCompany", async (req, res) => {
  try {
    const buyerCompanies = await BuyerCompany.find();
    res.status(200).json({ data: buyerCompanies });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const readAndConvertToBase64 = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const base64String = Buffer.from(data).toString("base64");
        resolve(base64String);
      }
    });
  });
};

// Route to get buyer company details by ID
app.get("/registerBuyerCompany/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buyerCompany = await BuyerCompany.findById(id);

    if (!buyerCompany) {
      return res.status(404).json({ message: "Buyer company not found" });
    }

    // Prepare response object with buyer company details
    const buyerCompanyDetails = {
      _id: buyerCompany._id,
      companyName: buyerCompany.companyName,
      location: buyerCompany.location,
      billingAddress: buyerCompany.billingAddress,
      gstNo: buyerCompany.gstNo,
      panNo: buyerCompany.panNo,
      accountNumber: buyerCompany.accountNumber,
      accountHolderName: buyerCompany.accountHolderName,
      ifscCode: buyerCompany.ifscCode,
      bankName: buyerCompany.bankName,
      password: buyerCompany.password,
      passbook: await readAndConvertToBase64(buyerCompany.passbook),
      gstCertificate: await readAndConvertToBase64(buyerCompany.gstCertificate),
      panCard: await readAndConvertToBase64(buyerCompany.panCard),
    };

    // Send response with buyer company details
    res.status(200).json({ buyerCompany: buyerCompanyDetails });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.delete("/registerBuyerCompany/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const buyerCompany = await BuyerCompany.findByIdAndDelete(id);
    if (!buyerCompany) {
      return res
        .status(404)
        .json({ message: `cannot find any Buyer company with ID ${id}` });
    }
    res.status(200).json(buyerCompany);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.post("/deal", async (req, res) => {
  try {
    const { selectedProduct, ...dealData } = req.body;
    const deal = await Deal.create({
      selectedProduct, // Include selectedProduct field
      ...dealData,
      qualityParameters: selectedProduct === "Soya" ? { protein: req.body.qualityParameters.protein } : 
                         selectedProduct === "Maize" || selectedProduct === "Broken Rice" ? { moisture: req.body.qualityParameters.moisture, fungus: req.body.qualityParameters.fungus } : {}
    });

    res.status(201).json(deal);
  } catch (error) {
    console.error("Error creating deal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});



app.get("/deal", async (req, res) => {
  try {
    const deal = await Deal.find();

    if (!deal || deal.length === 0) {
      return res.status(404).json({ message: "No farmers found" });
    }

    res.status(200).json({ deal });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/deal/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);
    if (!deal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.json({ deal });
  } catch (error) {
    console.error("Error fetching deal by ID:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/deal/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedDeal = await Deal.findByIdAndDelete(id);

    if (!deletedDeal) {
      return res.status(404).json({ message: "Deal not found" });
    }

    res.status(200).json({ message: "Deal deleted successfully", deletedDeal });
  } catch (error) {
    console.error("Error deleting deal:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// GET all broken rice quality parameters
app.get("/brokenRiceQualityParameters", async (req, res) => {
  try {
    const parameters = await BrokenRiceQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific broken rice quality parameter by ID
app.get("/brokenRiceQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Broken rice quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new broken rice quality parameter
app.post("/brokenRiceQualityParameters", async (req, res) => {
  try {
    const parameter = new BrokenRiceQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a broken rice quality parameter by ID
app.put("/brokenRiceQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Broken rice quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a broken rice quality parameter by ID
app.delete("/brokenRiceQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await BrokenRiceQualityParameters.findByIdAndDelete(
      req.params.id
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Broken rice quality parameter not found" });
    }
    res
      .status(200)
      .json({ message: "Broken rice quality parameter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/maizeQualityParameters", async (req, res) => {
  try {
    const parameters = await MaizeQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific maize quality parameter by ID
app.get("/maizeQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Maize quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new maize quality parameter
app.post("/maizeQualityParameters", async (req, res) => {
  try {
    const parameter = new MaizeQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a maize quality parameter by ID
app.put("/maizeQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Maize quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a maize quality parameter by ID
app.delete("/maizeQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await MaizeQualityParameters.findByIdAndDelete(
      req.params.id
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Maize quality parameter not found" });
    }
    res
      .status(200)
      .json({ message: "Maize quality parameter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all soya quality parameters
app.get("/soyaQualityParameters", async (req, res) => {
  try {
    const parameters = await SoyaQualityParameters.find();
    res.status(200).json(parameters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific soya quality parameter by ID
app.get("/soyaQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Soya quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new soya quality parameter
app.post("/soyaQualityParameters", async (req, res) => {
  try {
    const parameter = new SoyaQualityParameters(req.body);
    await parameter.save();
    res.status(201).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update a soya quality parameter by ID
app.put("/soyaQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Soya quality parameter not found" });
    }
    res.status(200).json(parameter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a soya quality parameter by ID
app.delete("/soyaQualityParameters/:id", async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findByIdAndDelete(
      req.params.id
    );
    if (!parameter) {
      return res
        .status(404)
        .json({ message: "Soya quality parameter not found" });
    }
    res
      .status(200)
      .json({ message: "Soya quality parameter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/participateOnBid', async (req, res) => {
  try {
      const participateOnBid = new ParticipateOnBid(req.body);
      await participateOnBid.save();
      res.status(201).send(participateOnBid);
  } catch (error) {
      res.status(400).send(error);
  }
});

// GET operation to retrieve all participateOnBids
app.get('/participateOnBid', async (req, res) => {
  try {
      const participateOnBids = await ParticipateOnBid.find();
      res.send(participateOnBids);
  } catch (error) {
      res.status(500).send(error);
  }
});

// GET operation to retrieve a participateOnBid by ID
app.get('/participateOnBid/:id', async (req, res) => {
  try {
      const participateOnBid = await ParticipateOnBid.findById(req.params.id);
      if (!participateOnBid) {
          return res.status(404).send({ error: 'ParticipateOnBid not found' });
      }
      res.send(participateOnBid);
  } catch (error) {
      res.status(500).send(error);
  }
});

// PUT operation to update a participateOnBid by ID
app.put('/participateOnBid/:id', async (req, res) => {
  try {
      const participateOnBid = await ParticipateOnBid.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!participateOnBid) {
          return res.status(404).send({ error: 'ParticipateOnBid not found' });
      }
      res.send(participateOnBid);
  } catch (error) {
      res.status(400).send(error);
  }
});

// DELETE operation to delete a participateOnBid by ID
app.delete('/participateOnBid/:id', async (req, res) => {
  try {
      const participateOnBid = await ParticipateOnBid.findByIdAndDelete(req.params.id);
      if (!participateOnBid) {
          return res.status(404).send({ error: 'ParticipateOnBid not found' });
      }
      res.send(participateOnBid);
  } catch (error) {
      res.status(500).send(error);
  }
});

async function getFarmerProduct(req, res, next) {
  try {
    const farmerProduct = await FarmerProduct.findById(req.params.id);
    if (!farmerProduct) {
      return res.status(404).json({ message: 'Cannot find farmer product' });
    }
    res.farmerProduct = farmerProduct;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// GET all farmer products
app.get('/farmerProducts', async (req, res) => {
  try {
    const farmerProducts = await FarmerProduct.find();
    res.json(farmerProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific farmer product by ID
app.get('/farmerProducts/:id', getFarmerProduct, (req, res) => {
  res.json(res.farmerProduct);
});

// POST create a new farmer product
// app.post('/farmerProducts', async (req, res) => {
//   const farmerProduct = new FarmerProduct({
//     farmerName: req.body.farmerName,
//     farmerId:req.body.farmerId,
//     selectedProducts: req.body.selectedProducts,
//     allProductsSelected: req.body.selectedProducts.length === 5
//   });

//   try {
//     const newFarmerProduct = await farmerProduct.save();
//     res.status(201).json(newFarmerProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
app.post('/farmerProducts', async (req, res) => {
  try {
    // Check if farmerId is provided
    if (!req.body.farmerId) {
      return res.status(400).json({ message: 'farmerId is required.' });
    }

    // Try to save the new farmer product
    const farmerProduct = new FarmerProduct({
      farmerName: req.body.farmerName,
      farmerId: req.body.farmerId,
      selectedProducts: req.body.selectedProducts,
      allProductsSelected: req.body.selectedProducts.length === 5
    });

    const newFarmerProduct = await farmerProduct.save();
    return res.status(201).json(newFarmerProduct);
  } catch (err) {
    // Check if the error is a duplicate key error
    if (err.code === 11000 && err.keyPattern && err.keyPattern.farmerId) {
      try {
        // If it's a duplicate key error for farmerId, update the existing document
        const existingProduct = await FarmerProduct.findOne({ farmerId: req.body.farmerId });
        if (existingProduct) {
          existingProduct.farmerName = req.body.farmerName;
          existingProduct.selectedProducts = req.body.selectedProducts;
          existingProduct.allProductsSelected = req.body.selectedProducts.length === 5;
          const updatedProduct = await existingProduct.save();
          return res.status(200).json(updatedProduct);
        } else {
          // Handle case where the document doesn't exist for some reason
          return res.status(400).json({ message: 'Unable to find existing document for the provided farmerId.' });
        }
      } catch (updateErr) {
        return res.status(400).json({ message: updateErr.message });
      }
    } else {
      // Handle other errors
      return res.status(400).json({ message: err.message });
    }
  }
});

// PUT update a farmer product
app.put('/farmerProducts/:id', getFarmerProduct, async (req, res) => {
  if (req.body.farmerName != null) {
    res.farmerProduct.farmerName = req.body.farmerName;
  }
  if (req.body.selectedProducts != null) {
    res.farmerProduct.selectedProducts = req.body.selectedProducts;
    res.farmerProduct.allProductsSelected = req.body.selectedProducts.length === 5;
  }
  try {
    const updatedFarmerProduct = await res.farmerProduct.save();
    res.json(updatedFarmerProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a farmer product
app.delete('/farmerProducts/:id', getFarmerProduct, async (req, res) => {
  try {
    await res.farmerProduct.remove();
    res.json({ message: 'Deleted farmer product' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET all pickup locations
app.get('/pickuplocations', async (req, res) => {
  try {
    const pickupLocations = await PickupLocation.find();
    res.json(pickupLocations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new pickup location
app.post('/pickuplocations', async (req, res) => {
  const pickupLocation = new PickupLocation({
    village: req.body.village,
    post: req.body.post,
    district: req.body.district,
    pin: req.body.pin,
    landmark:req.body.landmark,
    farmerName: req.body.farmerName,
    farmerId:req.body.farmerId,
  });

  try {
    const newPickupLocation = await pickupLocation.save();
    res.status(201).json(newPickupLocation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET a single pickup location by ID
app.get('/pickuplocations/:id', getPickupLocation, (req, res) => {
  res.json(res.pickupLocation);
});

async function getPickupLocation(req, res, next) {
  let pickupLocation;
  try {
    pickupLocation = await PickupLocation.findById(req.params.id);
    if (pickupLocation == null) {
      return res.status(404).json({ message: 'Pickup location not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  res.pickupLocation = pickupLocation;
  next();
}

app.post('/orders', async (req, res) => {
  try {
    const orderData = req.body;
    const order = await Order.create(orderData);
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET endpoint to retrieve all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Failed to retrieve orders' });
  }
});

app.get('/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error('Error retrieving order by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve order' });
  }
});

app.get('/farmerOrder', async (req, res) => {
  try {
    const farmers = await FarmerOrder.find();
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a farmer by ID
app.get('/farmerOrder/:id', getFarmer, (req, res) => {
  res.json(res.farmer);
});

// POST a new farmer
app.post('/farmerOrder', async (req, res) => {
  const farmer = new FarmerOrder({
    farmerName: req.body.farmerName,
    farmerId: req.body.farmerId,
    tons: req.body.tons,
    weightPerBag: req.body.weightPerBag,
    ratePerTon: req.body.ratePerTon,
    totalRupees: req.body.totalRupees,
    totalRupeesWords: req.body.totalRupeesWords
  });

  try {
    const newFarmer = await farmer.save();
    res.status(201).json(newFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a farmer
app.put('/farmerOrder/:id', getFarmer, async (req, res) => {
  if (req.body.farmerName != null) {
    res.farmer.farmerName = req.body.farmerName;
  }
  if (req.body.farmerId != null) {
    res.farmer.farmerId = req.body.farmerId;
  }
  if (req.body.tons != null) {
    res.farmer.tons = req.body.tons;
  }
  if (req.body.weightPerBag != null) {
    res.farmer.weightPerBag = req.body.weightPerBag;
  }
  if (req.body.ratePerTon != null) {
    res.farmer.ratePerTon = req.body.ratePerTon;
  }
  if (req.body.totalRupees != null) {
    res.farmer.totalRupees = req.body.totalRupees;
  }
  if (req.body.totalRupeesWords != null) {
    res.farmer.totalRupeesWords = req.body.totalRupeesWords;
  }
  try {
    const updatedFarmer = await res.farmer.save();
    res.json(updatedFarmer);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a farmer
app.delete('/farmerOrder/:id', getFarmer, async (req, res) => {
  try {
    await res.farmer.remove();
    res.json({ message: 'Deleted farmer' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a single farmer by ID
async function getFarmer(req, res, next) {
  let farmer;
  try {
    farmer = await FarmerOrder.findById(req.params.id);
    if (farmer == null) {
      return res.status(404).json({ message: 'Cannot find farmer' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.farmer = farmer;
  next();
}




// GET all quality parameters
app.get('/quality-parameter', async (req, res) => {
  try {
    const qualities = await Quality.find();
    res.json(qualities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a specific quality parameter by ID
app.get('/quality-parameter/:id', getQuality, (req, res) => {
  res.json(res.quality);
});

// POST a new quality parameter
app.post('/quality-parameter', async (req, res) => {
  const quality = new Quality({
    farmerId: req.body.farmerId,
    farmerName: req.body.farmerName,
    broken: req.body.broken,
    fungus: req.body.fungus,
    damage: req.body.damage,
    smallgain: req.body.smallgain,
    moisture: req.body.moisture
  });

  try {
    const newQuality = await quality.save();
    res.status(201).json(newQuality);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a quality parameter
app.put('/quality-parameter/:id', getQuality, async (req, res) => {
  if (req.body.farmerId != null) {
    res.quality.farmerId = req.body.farmerId;
  }
  if (req.body.farmerName != null) {
    res.quality.farmerName = req.body.farmerName;
  }
  if (req.body.broken != null) {
    res.quality.broken = req.body.broken;
  }
  if (req.body.fungus != null) {
    res.quality.fungus = req.body.fungus;
  }
  if (req.body.damage != null) {
    res.quality.damage = req.body.damage;
  }
  if (req.body.smallgain != null) {
    res.quality.smallgain = req.body.smallgain;
  }
  if (req.body.moisture != null) {
    res.quality.moisture = req.body.moisture;
  }

  try {
    const updatedQuality = await res.quality.save();
    res.json(updatedQuality);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a quality parameter
app.delete('quality-parameter/:id', getQuality, async (req, res) => {
  try {
    await res.quality.remove();
    res.json({ message: 'Deleted Quality Parameter' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to get quality parameter by ID
async function getQuality(req, res, next) {
  try {
    const quality = await Quality.findById(req.params.id);
    if (quality == null) {
      return res.status(404).json({ message: 'Cannot find quality parameter' });
    }
    res.quality = quality;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// order by farmer 

app.get('/orderByFarmer', async (req, res) => {
  try {
    const orders = await OrderByFarmer.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get order by ID
app.get('/orderByFarmer/:id', async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new order
// Create a new order
app.post('/orderByFarmer', async (req, res) => {
  const order = new OrderByFarmer({
    farmerId: req.body.farmerId,
    farmerName: req.body.farmerName,
    productName: req.body.productName,
    totalBags: req.body.totalBags,
    weightPerBag: req.body.weightPerBag,
    ratePerTon: req.body.ratePerTon,
    totalPrice: req.body.totalPrice,
    qualityParameters: req.body.qualityParameters,
    address: req.body.address
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    console.error('Error creating order:', err);  // Add this line
    res.status(400).json({ message: err.message });
  }
});


// Update an order
app.put('/orderByFarmer/:id', async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (req.body.farmerId != null) {
      order.farmerId = req.body.farmerId;
    }
    if (req.body.farmerName != null) {
      order.farmerName = req.body.farmerName;
    }
    if (req.body.productName != null) {
      order.productName = req.body.productName;
    }
    if (req.body.totalBags != null) {
      order.totalBags = req.body.totalBags;
    }
    if (req.body.weightPerBag != null) {
      order.weightPerBag = req.body.weightPerBag;
    }
    if (req.body.ratePerTon != null) {
      order.ratePerTon = req.body.ratePerTon;
    }
    if (req.body.totalPrice != null) {
      order.totalPrice = req.body.totalPrice;
    }
    if (req.body.qualityParameters != null) {
      order.qualityParameters = req.body.qualityParameters;
    }
    if (req.body.address != null) {
      order.address = req.body.address;
    }

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an order
app.delete('/orderByFarmer/:id', async (req, res) => {
  try {
    const order = await OrderByFarmer.findById(req.params.id);
    if (order == null) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/godown', async (req, res) => {
  try {
    const godown = new Godown(req.body);
    await godown.save();
    res.status(201).json(godown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Godowns
app.get('/godown', async (req, res) => {
  try {
    const godown = await Godown.find();
    res.status(200).json(godown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single Godown by ID
app.get('/godown/:id', async (req, res) => {
  try {
    const godown = await Godown.findById(req.params.id);
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json(godown);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Godown by ID
app.put('/godown/:id', async (req, res) => {
  try {
    const godown = await Godown.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json(godown);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Godown by ID
app.delete('/godown/:id', async (req, res) => {
  try {
    const godown = await Godown.findByIdAndDelete(req.params.id);
    if (!godown) {
      return res.status(404).json({ message: "Godown not found" });
    }
    res.status(200).json({ message: "Godown deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
  })
  .catch((error) => {
    console.log(error);
  });
