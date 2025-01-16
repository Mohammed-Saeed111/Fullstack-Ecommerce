const express = require("express");
const router = express.Router();
const {
  addCategory,
  updateCategory,
  deleteCategory,
  getCategories,
  getCategoryById,
} = require("./../handler/category-handeler");
router.post("/addcategory", async (req, res) => {
  try {
    let model = req.body;
    let result = await addCategory(model);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/getallcategories", async (req, res) => {
  try {
    let categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/getcategory/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let category = await getCategoryById(id);
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put("/updatecategory/:id", async (req, res) => {
  try {
    let model = req.body;
    let id = req.params.id;
    await updateCategory(id, model);
    res.status(200).json({
      updatedcategory: { ...model },
      message: "category updated successfully",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/deletecategory/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await deleteCategory(id);
    res.status(200).json({ message: "category deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
