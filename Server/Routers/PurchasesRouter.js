const purchasesBLL = require("../BLL/PurchasesBLL");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const purchases = await purchasesBLL.getAllPurchases();
  return res.json({ purchases });
});

router.get("/:purchaseId", async (req, res) => {
  const { purchaseId } = req.params;
  const purchases = await purchasesBLL.GetPurchaseById(purchaseId);
  return res.json({ purchases });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const message = await purchasesBLL.addNewPurchase(data);
  return res.status(201).json({ message });
});

router.delete("/:purchaseId", async (req, res) => {
  const { purchaseId } = req.params;
  const message = await purchasesBLL.deleteProduct(purchaseId);
  return res.status(200).json({ message });
});

module.exports = router;