const ProductModel = require("../Models/ProductModel");

const getAllProducts = async () => {
  return await ProductModel.find({});
};

const getProductById = async (productId) => {
  return await ProductModel.findById(productId);
};

const updateProduct = async (productId, productData) => {
  await ProductModel.findByIdAndUpdate(
    productId,
    {
      $push: { customers: { $each: productData.customers } },
    },
    { new: true }
  );
  return "Updated!";
};

const addNewProduct = async (product) => {
  const newProduct = new ProductModel(product);
  await newProduct.save();
  return "Created!";
};

const deleteProduct = async (productId) => {
  await ProductModel.findByIdAndDelete(productId);
  return "Deleted!";
};

module.exports = {
  getAllProducts,
  getProductById,
  updateProduct,
  addNewProduct,
  deleteProduct,
};
