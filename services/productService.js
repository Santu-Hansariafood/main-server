const Product = require('../models/ProductModel');

const addProduct = async (productData) => {
  const product = new Product(productData);
  await product.save();
  return product;
};

const getProducts = async () => {
  return await Product.find();
};

const updateProduct = async (id, productData) => {
  return await Product.findByIdAndUpdate(id, productData, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

module.exports = {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};
