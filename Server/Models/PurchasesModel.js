const mongoose = require("mongoose");

const PurchaseModel = new mongoose.Schema({
  customerName: String,
  customerId: Number,
  productId: String,
  date: String,
});

module.exports = mongoose.model("purchase", PurchaseModel);
