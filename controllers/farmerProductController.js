const createOrUpdateFarmerProduct = async (farmerId, farmerName, selectedProducts) => {
    try {
      const filter = { farmerId };
      const update = {
        farmerName,
        selectedProducts,
        allProductsSelected: selectedProducts.length === 5
      };
      const options = { upsert: true, new: true };
  
      const result = await FarmerProduct.findOneAndUpdate(filter, update, options);
  
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };
  
  module.exports = { createOrUpdateFarmerProduct };
  