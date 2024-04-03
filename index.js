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
const SoyaQualityParameters = require("./models/soyaModel")

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
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
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

app.get('/buyer', async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    console.error('Error fetching buyers:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// GET buyer by ID
app.get('/buyer/:id', async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.params.id);
    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }
    res.json(buyer);
  } catch (error) {
    console.error('Error fetching buyer by ID:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Create a new buyer
// app.post("/buyer", async (req, res) => {
//   try {
//     const { name, mobile, email, password, selectedProducts, companyName, consignees } = req.body;

//     // Check if all required fields are provided
//     if (!name || !mobile || !email || !password || !companyName) {
//       return res.status(400).json({ message: "Please provide all required fields" });
//     }

//     // Create a new Buyer instance
//     const newBuyer = new Buyer({
//       name,
//       mobile,
//       email,
//       password,
//       selectedProducts:[],
//       companyName,
//       consignees:[],
//     });

//     // Save the new buyer to the database
//     await newBuyer.save();

//     // Respond with the created buyer object
//     res.status(201).json(newBuyer);
//   } catch (error) {
//     console.error("Error creating buyer:", error);

//     // Handle server-side errors
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

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
app.put('/buyer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findByIdAndUpdate(id, req.body, { new: true });

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.json(buyer);
  } catch (error) {
    console.error('Error updating buyer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// DELETE route to delete buyer by ID
app.delete('/buyer/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const buyer = await Buyer.findByIdAndDelete(id);

    if (!buyer) {
      return res.status(404).json({ message: 'Buyer not found' });
    }

    res.json({ message: 'Buyer deleted successfully' });
  } catch (error) {
    console.error('Error deleting buyer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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
      if (error.code === 11000 && error.keyPattern && error.keyPattern.companyName && error.keyPattern.gstNo) {
        return res.status(400).send({ message: "Company name and GST number must be unique." });
      }
      res.status(500).send({ message: "Internal Server Error" });
    }
  });

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
        const base64String = Buffer.from(data).toString('base64');
        resolve(base64String);
      }
    });
  });
};

// Route to get buyer company details by ID
app.get('/registerBuyerCompany/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const buyerCompany = await BuyerCompany.findById(id);

    if (!buyerCompany) {
      return res.status(404).json({ message: 'Buyer company not found' });
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
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
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


// quality parameter

// soya quality parameters 

app.post('/soya-quality-parameters', async (req, res) => {
  try {
    // Convert parameters to strings
    Object.keys(req.body).forEach(param => {
      req.body[param] = String(req.body[param]);
    });

    // Create a new SoyaQualityParameters document
    const newSoyaQualityParameters = new SoyaQualityParameters(req.body);

    // Save the document to the database
    await newSoyaQualityParameters.save();

    // Respond with success message
    res.status(201).json({ success: true, message: 'Soya quality parameters saved successfully' });
  } catch (error) {
    // Error handling code...
  }
});

app.get('/soya-quality-parameters', async (req, res) => {
  try {
    const parameters = await SoyaQualityParameters.find();
    res.json(parameters);
  } catch (error) {
    console.error('Error fetching Soya quality parameters:', error);
    res.status(500).json({ error: 'Failed to fetch Soya quality parameters' });
  }
});

// Route to get a single Soya quality parameters by ID
app.get('/soya-quality-parameters/:id', async (req, res) => {
  try {
    const parameter = await SoyaQualityParameters.findById(req.params.id);
    if (!parameter) {
      return res.status(404).json({ error: 'Soya quality parameters not found' });
    }
    res.json(parameter);
  } catch (error) {
    console.error('Error fetching Soya quality parameters:', error);
    res.status(500).json({ error: 'Failed to fetch Soya quality parameters' });
  }
});

// Route to update Soya quality parameters by ID
app.put('/soya-quality-parameters/:id', async (req, res) => {
  try {
    const updatedParameter = await SoyaQualityParameters.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedParameter);
  } catch (error) {
    console.error('Error updating Soya quality parameters:', error);
    res.status(500).json({ error: 'Failed to update Soya quality parameters' });
  }
});

// Route to delete Soya quality parameters by ID
app.delete('/soya-quality-parameters/:id', async (req, res) => {
  try {
    const deletedParameter = await SoyaQualityParameters.findByIdAndDelete(req.params.id);
    if (!deletedParameter) {
      return res.status(404).json({ error: 'Soya quality parameters not found' });
    }
    res.json({ message: 'Soya quality parameters deleted successfully' });
  } catch (error) {
    console.error('Error deleting Soya quality parameters:', error);
    res.status(500).json({ error: 'Failed to delete Soya quality parameters' });
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
