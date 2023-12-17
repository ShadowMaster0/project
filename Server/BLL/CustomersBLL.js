const CustomersModel = require("../Models/CustomersModel");

const getAllCustomers = async () => {
  return await CustomersModel.find({});
};

const getCustomerById = async (customerId) => {
  return await CustomersModel.findById(customerId);
};

const updatePurchases = async (customerId, purchases) => {
  await CustomersModel.findByIdAndUpdate(
    customerId,
    {
      $push: { purchases: { $each: purchases.purchases } },
    },
    { new: true }
  );
  return "Updated!";
};

const updateCustomer = async (customerId, customerData) => {
  await CustomersModel.findByIdAndUpdate(customerId, customerData, {
    new: true,
  });
  return "Updated!";
};

const addNewCustomer = async (name, username, email, city, password) => {
  const newCustomer = new CustomersModel({
    name,
    username,
    email,
    city,
    password,
  });
  const savedCustomer = await newCustomer.save();
  return savedCustomer;
};

const deleteCustomer = async (customerId) => {
  await CustomersModel.findByIdAndDelete(customerId);
  return "Deleted!";
};

const loginDB = async (username) => {
  const user = await CustomersModel.findOne({ username });
  if (!user) {
    throw new Error("Invalid credentials");
  }
  return user;
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  updatePurchases,
  updateCustomer,
  addNewCustomer,
  deleteCustomer,
  loginDB,
};
