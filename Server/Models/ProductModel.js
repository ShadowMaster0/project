const mongoose = require("mongoose");

const ProductModel = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  category: String,
  customers: [{ name: String, email: String }],
});

module.exports = mongoose.model("product", ProductModel);
