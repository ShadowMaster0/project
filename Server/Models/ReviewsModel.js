const mongoose = require("mongoose");

const ReviewsModel = new mongoose.Schema({
  productId: String,
  review: String,
  customerName: String,
  date: String,
});

module.exports = mongoose.model("review", ReviewsModel);
