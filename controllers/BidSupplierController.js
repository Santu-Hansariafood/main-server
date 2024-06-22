const Bid = require('../models/bidSupplier');

const createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    const newBid = await bid.save();
    res.status(201).json(newBid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find().populate('godown');
    res.json(bids);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id).populate('godown');
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }
    res.json(bid);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBidById = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }
    res.json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteBidById = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) {
      return res.status(404).json({ message: 'Bid not found' });
    }
    res.json({ message: 'Bid deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBid,
  getAllBids,
  getBidById,
  updateBidById,
  deleteBidById,
};
