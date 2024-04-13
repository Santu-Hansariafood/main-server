const mongoose = require("mongoose");

const soyaQualityParametersSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    parameters: {
      protein: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      moisture: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      ss: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      fibre: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      oil: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      mandi: {
        value: {
          type: String,
          enum: ["applicable", "not applicable"],
          required: true,
        },
      },
    },
  },
  { timestamps: true }
);

const SoyaQualityParameters = mongoose.model(
  "SoyaQualityParameters",
  soyaQualityParametersSchema
);

module.exports = SoyaQualityParameters;
