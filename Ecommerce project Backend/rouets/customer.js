const express = require("express");
const {
  getFeaturedProducts,
  getNewProducts,
  getProductForListing,
  getProductById,
} = require("./../handler/product-handeler");
const {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("./../handler/wishlist-handeler");
const { getBrands } = require("./../handler/brand-handeler");
const { getCategories } = require("../handler/category-handeler");
const {
  addToCart,
  removeFromCart,
  getCartItems,
  clearCart,
} = require("./../handler/cart-handeler");
const { addOrder, getCustomerOrders } = require("./../handler/order-handeler");
const router = express.Router();
router.get("/home/new-products", async (req, res) => {
  try {
    let products = await getNewProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
router.get("/home/featured-product", async (req, res) => {
  try {
    let products = await getFeaturedProducts();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});
router.get("/categories", async (req, res) => {
  try {
    let categories = await getCategories();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/brands", async (req, res) => {
  try {
    let brands = await getBrands();
    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/products", async (req, res) => {
  const { searchTerm, categoryId, page, pageSize, sortBy, sortOrder, brandId } =
    req.query;
  const products = await getProductForListing(
    searchTerm,
    categoryId,
    page,
    pageSize,
    sortBy,
    sortOrder,
    brandId
  );
  res.status(200).json(products);
});
router.get("/product/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let product = await getProductById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.get("/wishlists", async (req, res) => {
  try {
    const userId = req.user.id;
    const items = await getWishlist(userId);
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/wishlists/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const productID = req.params.id;
    console.log(productID);
    const item = await addToWishlist(userId, productID);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/wishlists/:id", async (req, res) => {
  try {
    const userId = req.user.id;
    const productID = req.params.id;
    console.log(productID);
    const item = await removeFromWishlist(userId, productID);
    res.status(200).json({ message: "wishlist deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/carts", async (req, res) => {
  try {
    const id = req.user.id;
    let products = await getCartItems(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/carts/:id", async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.params.id;
    const quantity = req.body.quantity;
    await addToCart(id, productId, +quantity);
    res.status(200).json({ message: "product in cart added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.delete("/carts/:productId", async (req, res) => {
  try {
    const id = req.user.id;
    const productId = req.params.productId;
    await removeFromCart(id, productId);
    res.status(200).json({ message: "product in cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post("/order", async (req, res) => {
  try {
    const userId = req.user.id;
    const order = req.body;
    await addOrder(userId, order);
    await clearCart(userId);
    res.status(201).json({ message: "order created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.get("/orders", async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await getCustomerOrders(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
