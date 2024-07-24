const Bid = require("../models/bidModel");
const Buyer = require("../models/buyerModel");
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const getAllBids = async (req, res) => {
  try {
    const bids = await Bid.find();
    res.status(200).send(bids);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getBidById = async (req, res) => {
  try {
    const bid = await Bid.findById(req.params.id);
    if (!bid) {
      return res.status(404).send({ message: "Bid not found" });
    }
    res.status(200).send(bid);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createBid = async (req, res) => {
  try {
    const bid = new Bid(req.body);
    await bid.save();

    const buyers = await Buyer.find(); // Fetch all buyers
    const buyerPhoneNumbers = buyers.map((buyer) => buyer.phoneNumber);

    const messageBody = `
      You have a new bid.
      Bid ID: ${bid._id}.
      Start at: ${bid.startTime}.
      Close at: ${bid.endTime}.
      Buyer: ${bid.buyer}.
      Loc: ${bid.buyerLocation}.
      Prod: ${bid.product}.
      Rate: ${bid.rateForBid}.
      QTY: ${bid.quantity} ${bid.unit}.
      - Team Hansaria
    `;

    buyerPhoneNumbers.forEach((mobile) => {
      client.messages
        .create({
          body: messageBody,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: `+91${mobile}`,
        })
        .then((message) => console.log("Message SID:", message.sid))
        .catch((error) => {
          if (error.code === 21608) {
            console.error(
              "Error: Unverified number. Please verify the number or upgrade your Twilio account."
            );
          } else {
            console.error("Error sending message:", error);
          }
        });
    });

    res.status(201).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateBidById = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bid) {
      return res.status(404).send({ message: "Bid not found" });
    }
    res.status(200).send(bid);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteBidById = async (req, res) => {
  try {
    const bid = await Bid.findByIdAndDelete(req.params.id);
    if (!bid) {
      return res.status(404).send({ message: "Bid not found" });
    }
    res.status(200).send({ message: "Bid deleted" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllBids,
  getBidById,
  createBid,
  updateBidById,
  deleteBidById,
};
