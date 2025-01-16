const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRouter = require("./rouets/category");
const brandRouter = require("./rouets/brand");
const productRouter = require("./rouets/product");
const customerRouter = require("./rouets/customer");
const authRouter = require("./rouets/auth");
const orderRouter = require("./rouets/order");
const { verifyToken, isAdmin } = require("./middleWare/auth-middleware");
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);
app.use(express.json());
app.use("/uploads", express.static("./uploads"));
app.get("/", (req, res) => {
  res.send("server running");
});
app.use("/category", verifyToken, isAdmin, categoryRouter);
app.use("/brand", verifyToken, isAdmin, brandRouter);
app.use("/product", verifyToken, isAdmin, productRouter);
app.use("/orders", verifyToken, isAdmin, orderRouter);
app.use("/customer", verifyToken, customerRouter);
app.use("/auth", authRouter);
async function connectdb() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "Ecommerce-db",
  });
  console.log("mogodb connected");
}
connectdb().catch((err) => console.error(err));
app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
