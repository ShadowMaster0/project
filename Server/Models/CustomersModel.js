const mongoose = require("mongoose");

const CustomerModel = new mongoose.Schema({
  name: String,
  username: String,
  password: String,
  email: String,
  city: String,
  purchases: [
    {
      name: String,
      price: Number,
      date: Date,
    },
  ],
});

module.exports = mongoose.model("customer", CustomerModel);
