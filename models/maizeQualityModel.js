const mongoose = require("mongoose");

const maizeQualityParametersSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    parameters: {
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
      fungus: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      waterDamage: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      fm: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      damage: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      broken: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      aflatoxin: {
        min: {
          type: Number,
          required: true,
        },
        max: {
          type: Number,
          required: true,
        },
      },
      starch: {
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

const MaizeQualityParameters = mongoose.model(
  "MaizeQualityParameters",
  maizeQualityParametersSchema
);

module.exports = MaizeQualityParameters;
