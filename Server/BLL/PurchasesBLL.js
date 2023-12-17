const PurchasesModel = require("../Models/PurchasesModel");

const getAllPurchases = async () => {
  try {
    const allPurchases = await PurchasesModel.find({});
    return allPurchases;
  } catch (e) {
    console.log(e);
  }
};

const GetPurchaseById = async (purchaseId) => {
  try {
    const purchase = await PurchasesModel.findById(purchaseId);
    return purchase;
  } catch (e) {
    console.log(e);
  }
};

const addNewPurchase = async (purchase) => {
  const newPurchase = new PurchasesModel(purchase);
  await newPurchase.save();
  return "Created!";
};

module.exports = { getAllPurchases, GetPurchaseById, addNewPurchase };
