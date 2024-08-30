const mongoose = require("mongoose");

const RiceMillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, enum: ["owner", "manager", "agent"], required: true },
    riceMillName: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    pin: { type: String, required: true },
    district: { type: String, required: true },
    phoneNumbers: { 
      type: [String], 
      required: true,
      validate: {
        validator: function(v) {
          return v.every(num => /^[0-9]{10}$/.test(num));
        },
        message: props => `${props.value} is not a valid phone number!`
      }
    },
    email: { type: String, match: /.+\@.+\..+/ },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RiceMill", RiceMillSchema);
