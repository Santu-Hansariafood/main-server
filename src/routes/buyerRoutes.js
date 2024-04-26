const express = require("express");
const multer = require("multer");
const fs = require("fs");
const Buyer = require("./models/buyerModel");
const BuyerCompany = require("./models/buyerCompanyModel");
const Deal = require("./models/dealsModel");

const app = express();
app.use(express.json());

// Define multer storage configuration
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
  limits: { fileSize: 10 * 1024 * 1024 }, // Limiting file size to 10MB
});

// Route to register a new buyer
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

// Route to get all buyers
app.get("/buyer", async (req, res) => {
  try {
    const buyers = await Buyer.find();
    res.json(buyers);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get buyer by ID
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

// Route to update buyer by ID
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

// Route to delete buyer by ID
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

// Route to register a new buyer company
app.post(
  "/registerBuyerCompany",
  upload.fields([
    { name: "passbook", maxCount: 1 },
    { name: "gstCertificate", maxCount: 1 },
    { name: "panCard", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Parse request body
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

      // Retrieve file paths
      const passbook = req.files["passbook"][0].path;
      const gstCertificate = req.files["gstCertificate"][0].path;
      const panCard = req.files["panCard"][0].path;

      // Create new buyer company record
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

      // Send response
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
      res.status(500).send({ message: "Internal Server Error." });
    }
  }
);

// Route to get all deals
app.get("/deals", async (req, res) => {
  try {
    const deals = await Deal.find();
    res.json(deals);
  } catch (error) {
    console.error("Error fetching deals:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = app;
