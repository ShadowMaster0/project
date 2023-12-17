const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/StoreDB")
  .then(() => console.log("Connected to DB"))
  .catch((e) => console.log("Error Connecting to DB"));
