const express = require("express");
const uploade = require("../utilities/multerConfig");
const router = express.Router();
const {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("./../handler/product-handeler");
// router.post("/addproduct", async (req, res) => {
//   try {
//     let model = req.body;
//     let product = await addProduct(model);
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
router.post("/addproduct", uploade.array("images", 5), async (req, res) => {
  try {
    const {
      name,
      shortDescription,
      description,
      price,
      discount,
      categoryId,
      brandId,
      isFeatured,
      isNewProduct,
    } = req.body;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }
    const images = req.files.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`
    );
    let model = {
      name,
      shortDescription,
      description,
      price,
      discount,
      categoryId,
      brandId,
      images,
      isFeatured,
      isNewProduct,
    };
    let product = await addProduct(model);
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

router.get("/getproducts", async (req, res) => {
  try {
    let products = await getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/getproduct/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// router.put("/updateproduct/:id", async (req, res) => {
//   try {
//     let model = req.body;
//     let id = req.params.id;
//     await updateProduct(id, model);
//     res.status(200).json({
//       updatedcategory: { ...model },
//       message: "product updated successfully",
//     });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });
const mongoose = require("mongoose");

router.put(
  "/updateproduct/:id",
  uploade.array("images", 5),
  async (req, res) => {
    try {
      const { id } = req.params;

      // Validate the ObjectId
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID." });
      }

      const {
        name,
        shortDescription,
        description,
        price,
        discount,
        categoryId,
        brandId,
        isFeatured,
        isNewProduct,
      } = req.body;

      // Initialize the model object with the new data
      const model = {
        name,
        shortDescription,
        description,
        price,
        discount,
        categoryId,
        brandId,
        isFeatured,
        isNewProduct,
      };

      // Update the images if new files are uploaded
      if (req.files && req.files.length > 0) {
        const images = req.files.map(
          (file) => `http://localhost:3000/uploads/${file.filename}`
        );
        model.images = images; // Only set images if new files are provided
      }

      // Update the product in the database
      const updatedProduct = await updateProduct(id, model);

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found." });
      }

      res.status(200).json({
        updatedProduct,
        message: "Product updated successfully",
      });
    } catch (err) {
      console.error(err); 
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/deleteproduct/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await deleteProduct(id);
    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
