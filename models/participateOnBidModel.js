const mongoose = require('mongoose');

const participateOnBidSchema = new mongoose.Schema({
    quantity: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        required: true
    },
    buyer: {
        type: String,
        required: true
    },
    consignee: {
        type: String
    },
    productName: {
        type: String
    },
    companyName: {
        type: String
    },
    buyerRate: {
        type: String
    },
    buyerQuantity: {
        type: String
    },
    paymentTerms: {
        type: String
    },
    delivery: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    dealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deal'
    },
    moisture: {
        type: String
    },
    fungus: {
        type: String
    },
    date: {
        type: Date
    }
});


const ParticipateOnBid = mongoose.model('ParticipateOnBid', participateOnBidSchema);

module.exports = ParticipateOnBid;
