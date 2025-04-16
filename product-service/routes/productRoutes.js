const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// CREATE
router.post("/", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ ALL
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ ONE
router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  Product
    ? res.json(product)
    : res.status(404).json({ error: "Product not found" });
});

// UPDATE
router.put("/:id", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Product deleted" });
});

module.exports = router;
