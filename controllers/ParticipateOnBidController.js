const ParticipateOnBid = require('../models/participateOnBidModel');

// Create a new participateOnBid
const createParticipateOnBid = async (req, res) => {
  try {
    const participateOnBid = new ParticipateOnBid(req.body);
    await participateOnBid.save();
    res.status(201).send(participateOnBid);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all participateOnBids
const getAllParticipateOnBids = async (req, res) => {
  try {
    const participateOnBids = await ParticipateOnBid.find();
    res.send(participateOnBids);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a participateOnBid by ID
const getParticipateOnBidById = async (req, res) => {
  try {
    const participateOnBid = await ParticipateOnBid.findById(req.params.id);
    if (!participateOnBid) {
      return res.status(404).send({ error: "ParticipateOnBid not found" });
    }
    res.send(participateOnBid);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a participateOnBid by ID
const updateParticipateOnBidById = async (req, res) => {
  try {
    const participateOnBid = await ParticipateOnBid.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!participateOnBid) {
      return res.status(404).send({ error: "ParticipateOnBid not found" });
    }
    res.send(participateOnBid);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a participateOnBid by ID
const deleteParticipateOnBidById = async (req, res) => {
  try {
    const participateOnBid = await ParticipateOnBid.findByIdAndDelete(req.params.id);
    if (!participateOnBid) {
      return res.status(404).send({ error: "ParticipateOnBid not found" });
    }
    res.send(participateOnBid);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createParticipateOnBid,
  getAllParticipateOnBids,
  getParticipateOnBidById,
  updateParticipateOnBidById,
  deleteParticipateOnBidById
};
