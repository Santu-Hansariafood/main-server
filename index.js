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

app.post("/employeeRegister", async (req, res) => {
  try {
    const employeeRegister = await EmployeeRegister.create(req.body);
    res.status(201).json(employeeRegister);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET employeeRegister

app.get("/employeeRegister", async (req, res) => {
  try {
    const employeeRegister = await EmployeeRegister.find({});
    res.status(200).json(employeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//find the employeeRegister by  its ID

app.get("/employeeRegister/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employeeRegister = await EmployeeRegister.findById(id);
    res.status(200).json(employeeRegister);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/employeeRegister/:mobile", (req, res) => {
  const mobile = req.params.mobile;
  EmployeeRegister.find({ mobile: mobile }, (err, employees) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employees);
  });
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

// POST a new farmer product
// app.post('/farmerProducts', async (req, res) => {
//   const farmerProduct = new FarmerProduct({
//     farmerId: req.body.farmerId,
//     farmerName: req.body.farmerName,
//     selectedProducts: req.body.selectedProducts,
//     allProductsSelected: req.body.allProductsSelected
//   });

//   try {
//     toggleProductsList(farmerProduct);

//     const newFarmerProduct = await farmerProduct.save();
//     res.status(201).json(newFarmerProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

app.post('/farmerProducts', async (req, res) => {
  const { farmerId, farmerName, selectedProducts } = req.body;

  try {
    // Create a new product document
    const newProduct = new Product({
      farmerId,
      farmerName,
      selectedProducts
    });

    // Save the product to the database
    await newProduct.save();

    res.status(201).json(newProduct); // Send back the saved product
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// app.post('/farmerProducts', async (req, res) => {
//   const farmerProduct = new FarmerProduct({
//     farmerId: req.body.farmerId,
//     farmerName: req.body.farmerName,
//     selectedProducts: req.body.selectedProducts,
//     allProductsSelected: req.body.selectedProducts.length === 5
//   });

//   try {
//     const newFarmerProduct = await farmerProduct.save();
//     toggleProductsList(newFarmerProduct); // Call toggleProductsList after saving
//     res.status(201).json(newFarmerProduct);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
// PUT update a farmer product
app.put('/farmerProducts/:id', getFarmerProduct, async (req, res) => {
  if (req.body.farmerId != null) {
    res.farmerProduct.farmerId = req.body.farmerId;
  }
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

// Middleware function to get a single farmer product by ID
async function getFarmerProduct(req, res, next) {
  try {
    const farmerProduct = await FarmerProduct.findById(req.params.id);
    if (farmerProduct == null) {
      return res.status(404).json({ message: 'Cannot find farmer product' });
    }
    res.farmerProduct = farmerProduct;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Function to toggle product selection
// const toggleProductsList = (farmerProduct) => {
//   if (farmerProduct.selectedProducts.length === 5) {
//     farmerProduct.allProductsSelected = false;
//     farmerProduct.selectedProducts = [];
//   } else {
//     farmerProduct.allProductsSelected = true;
//     farmerProduct.selectedProducts = ["Product 1", "Product 2", "Product 3", "Product 4", "Product 5"];
//   }
// };

// Function to toggle product selection
const toggleProductsList = (farmerProduct) => {
  if (farmerProduct.selectedProducts.length > 0) {
    // If any product is selected, deselect all products
    farmerProduct.allProductsSelected = false;
    farmerProduct.selectedProducts = [];
  } else {
    // If no product is selected, select all products
    farmerProduct.allProductsSelected = true;
    farmerProduct.selectedProducts = ["Maize", "Soya", "Broken Rice", "Wheat", "Paddy"];
  }
};


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
