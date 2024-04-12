// const mongoose = require("mongoose");

// const buyerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   mobile: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: function(v) {
//         return /\d{10}/.test(v);
//       },
//       message: props => `${props.value} is not a valid mobile number!`
//     }
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     validate: {
//       validator: function(v) {
//         return /\S+@\S+\.\S+/.test(v);
//       },
//       message: props => `${props.value} is not a valid email address!`
//     }
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   selectedProducts: {
//     type: [String],
//     default: [],
//   },
//   companyName: {
//     type: String,
//     required: true,
//   },
//   consignees: {
//     type: [String],
//     default: [],
//   },
// });

// const Buyer = mongoose.model("Buyer", buyerSchema);

// module.exports = Buyer;



const mongoose = require("mongoose");

const buyerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  selectedProducts: {
    type: [String],
    default: [],
  },
  companyName: {
    type: String,
    required: true,
    unique:true
  },
  consignees: {
    type: [String],
    default: [],
  },
},
{timestamps:true});

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
