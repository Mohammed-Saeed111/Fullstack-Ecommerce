const express = require("express");
const { getOrders, updateOrderStatus } = require("./../handler/order-handeler");
const router = express.Router();
router.get("", async (req, res) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
});
router.post("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const status = req.body;
    await updateOrderStatus(id, status.status);
    res.status(200).json({ message: "successfully updated status" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
