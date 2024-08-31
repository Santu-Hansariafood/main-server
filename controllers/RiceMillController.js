const RiceMill = require("../models/riceMillModel");

const registerRiceMill = async (req, res) => {
  try {
    const { phoneNumbers } = req.body;

    if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one phone number is required" });
    }

    const isValidPhoneNumbers = phoneNumbers.every((num) =>
      /^[0-9]{10}$/.test(num)
    );
    if (!isValidPhoneNumbers) {
      return res
        .status(400)
        .json({ error: "Each phone number must be a 10-digit number" });
    }

    const newRiceMill = new RiceMill(req.body);
    await newRiceMill.save();
    res.status(201).json({ message: "Rice Mill registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRiceMills = async (req, res) => {
  try {
    const riceMills = await RiceMill.find();
    res.json(riceMills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRiceMillById = async (req, res) => {
  try {
    const riceMill = await RiceMill.findById(req.params.id);
    if (!riceMill) {
      return res.status(404).json({ message: "Rice Mill not found" });
    }
    res.json(riceMill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateRiceMill = async (req, res) => {
  try {
    const { phoneNumbers } = req.body;

    if (phoneNumbers) {
      if (!Array.isArray(phoneNumbers) || phoneNumbers.length === 0) {
        return res
          .status(400)
          .json({ error: "At least one phone number is required" });
      }

      const isValidPhoneNumbers = phoneNumbers.every((num) =>
        /^[0-9]{10}$/.test(num)
      );
      if (!isValidPhoneNumbers) {
        return res
          .status(400)
          .json({ error: "Each phone number must be a 10-digit number" });
      }
    }

    const updatedRiceMill = await RiceMill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRiceMill) {
      return res.status(404).json({ message: "Rice Mill not found" });
    }
    res.json({ message: "Rice Mill updated successfully", updatedRiceMill });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteRiceMill = async (req, res) => {
  try {
    const deletedRiceMill = await RiceMill.findByIdAndDelete(req.params.id);
    if (!deletedRiceMill) {
      return res.status(404).json({ message: "Rice Mill not found" });
    }
    res.json({ message: "Rice Mill deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  registerRiceMill,
  getRiceMills,
  getRiceMillById,
  updateRiceMill,
  deleteRiceMill,
};
