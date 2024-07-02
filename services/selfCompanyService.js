const SelfCompany = require('../models/SelfCompany');

const addSelfCompany = async (data) => {
  const newCompany = new SelfCompany(data);
  return await newCompany.save();
};

const getSelfCompanies = async () => {
  return await SelfCompany.find();
};

const deleteSelfCompany = async (id) => {
  const company = await SelfCompany.findById(id);
  if (company) {
    await company.remove();
  }
  return company;
};

module.exports = {
  addSelfCompany,
  getSelfCompanies,
  deleteSelfCompany,
};
