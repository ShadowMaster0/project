const productsBLL = require("../BLL/ProductsBLL");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const products = await productsBLL.getAllProducts();
  return res.json({ products });
});

router.get("/:productId", async (req, res) => {
  const { productId } = req.params;
  const product = await productsBLL.getProductById(productId);
  return res.json({ product });
});

router.post("/", async (req, res) => {
  const data = req.body;
  const message = await productsBLL.addNewProduct(data);
  return res.status(201).json({ message });
});

router.put("/:productId", async (req, res) => {
  const { productId } = req.params;
  const data = req.body;
  const message = await productsBLL.updateProduct(productId, data);
  return res.status(200).json({ message });
});

router.delete("/:productId", async (req, res) => {
  const { productId } = req.params;
  const message = await productsBLL.deleteProduct(productId);
  return res.status(200).json({ message });
});

module.exports = router;
