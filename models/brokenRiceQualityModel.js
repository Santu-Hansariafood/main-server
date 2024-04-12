// const mongoose = require("mongoose");

// const brokenRiceQualityParametersSchema = new mongoose.Schema({
//   moisture: {
//     type: String,
//     required: true,
//   },
//   fungus: {
//     type: String,
//     required: true,
//   },
//   waterDamage: {
//     type: String,
//     required: true,
//   },
//   fm: {
//     type: String,
//     required: true,
//   },
//   damage: {
//     type: String,
//     required: true,
//   },
//   broken: {
//     type: String,
//     required: true,
//   },
//   aflatoxin: {
//     type: String,
//     required: true,
//   },
//   starch: {
//     type: String,
//     required: true,
//   },
//   mandi: {
//     type: String,
//     enum: ["applicable", "not applicable"],
//     required: true,
//   },
// });

// const BrokenRiceQualityParameters = mongoose.model(
//   "BrokenRiceQualityParameters",
//   brokenRiceQualityParametersSchema
// );

// module.exports = BrokenRiceQualityParameters;

const mongoose = require("mongoose");

const brokenRiceQualityParameters = new mongoose.Schema(
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

const BrokenRiceQualityParameters = mongoose.model(
  "BrokenRiceQualityParameters",
  brokenRiceQualityParameters
);

module.exports = BrokenRiceQualityParameters;
