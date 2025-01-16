const express = require("express");
const router = express.Router();
const {
  addBrand,
  deleteBrand,
  updateBrand,
  getBrands,
  getBrandById,
} = require("./../handler/brand-handeler");
router.get("/getallbrands", async (req, res) => {
  try {
    let brands = await getBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/getbrand/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let brand = await getBrandById(id);
    res.status(200).json(brand);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/addbrand", async (req, res) => {
  try {
    let model = req.body;
    let result = await addBrand(model);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/updatebrand/:id", async (req, res) => {
  try {
    let model = req.body;
    let id = req.params.id;
    await updateBrand(id, model);
    res.status(200).json({
      updatedcategory: { ...model },
      message: "brand updated successfully",
    });
  } catch (err) {
    res.start(400).json({ message: err.message });
  }
});
router.delete("/deletebrand/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await deleteBrand(id);
    res.status(200).json({ message: "brand deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
