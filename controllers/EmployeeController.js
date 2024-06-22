const Employee = require('../models/employeeRegisterModel');

exports.registerEmployee = async (req, res) => {
  const {
    firstname,
    lastname,
    mobile,
    email,
    role,
    password,
    confirmPassword,
  } = req.body;

  if (password !== confirmPassword) {
    return res.json({ success: false, message: "Passwords do not match" });
  }

  try {
    const newEmployee = new Employee({
      firstname,
      lastname,
      mobile,
      email,
      role,
      password,
      confirmPassword,
    });

    await newEmployee.save();

    res.json({ success: true, message: "Employee registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.loginEmployee = async (req, res) => {
  const { mobile, password } = req.body;

  try {
    const employee = await Employee.findOne({ mobile });

    if (employee && employee.password === password) {
      res.json({ success: true, employee });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEmployeeByMobile = async (req, res) => {
  try {
    const { mobile } = req.params;
    const employee = await Employee.find({ mobile: mobile });
    if (!employee || employee.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedEmployee) {
      return res
        .status(404)
        .json({ message: `Cannot find any employee with ID ${id}` });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res
        .status(404)
        .json({ message: `Cannot find any employee with ID ${id}` });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
