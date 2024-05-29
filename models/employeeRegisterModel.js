// const mongoose = require("mongoose");

// const employeeRegisterSchema = mongoose.Schema(
//   {
//     firstname: {
//       type: String,
//       required: [true, "Please enter a valid name"],
//     },
//     lastname: {
//       type: String,
//       required: [true, "Please enter a valid last name"],
//     },
//     mobile: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       lowercase: true,
//       unique: true,
//     },
//     role: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     confirmPassword: {
//       type: String,
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// employeeRegisterSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("Duplicate key error"));
//   } else {
//     console.error(error.message);
//     next(error);
//   }
// });

// const EmployeeRegister = mongoose.model(
//   "EmployeeRegister",
//   employeeRegisterSchema
// );

// module.exports = EmployeeRegister;



const mongoose = require("mongoose");

const employeeRegisterSchema = mongoose.Schema(
  {
    firstname: {
      type: String,
      required: [true, "Please enter a valid name"],
    },
    lastname: {
      type: String,
      required: [true, "Please enter a valid last name"],
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmPassword: {
      type: String,
      required: true,
    },
    employeeId: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook to generate employee ID
employeeRegisterSchema.pre("save", async function (next) {
  if (!this.isNew) return next();

  try {
    const roleCode = this.role.toUpperCase();
    const count = await mongoose
      .model("EmployeeRegister")
      .countDocuments({ role: this.role });
    const employeeId = `HANS/${roleCode}/${(count + 1).toString().padStart(4, "0")}`;
    this.employeeId = employeeId;
    next();
  } catch (error) {
    next(error);
  }
});

const EmployeeRegister = mongoose.model("EmployeeRegister", employeeRegisterSchema);

module.exports = EmployeeRegister;
