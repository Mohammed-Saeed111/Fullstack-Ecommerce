const Product = require("../db/product");
async function addProduct(model) {
  let product = new Product({ ...model });
  await product.save();
  return product.toObject();
}
async function updateProduct(id, model) {
  const updatedProduct = await Product.findByIdAndUpdate(id, model, {
    new: true,
  });
  return updatedProduct.toObject();
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
  return;
}
async function getAllProducts() {
  let products = await Product.find();
  return products.map((product) => product.toObject());
}
async function getProductById(id) {
  let product = await Product.findById(id);
  return product.toObject();
}
async function getNewProducts() {
  let products = await Product.find({ isNewProduct: true });
  return products.map((x) => x.toObject());
}
async function getFeaturedProducts() {
  let products = await Product.find({ isFeatured: true });
  return products.map((x) => x.toObject());
}
async function getProductForListing(
  searchTerm,
  categoryId,
  page,
  pageSize,
  sortBy,
  sortOrder,
  brandId
) {
  let queryFilter = {};
  if (!sortBy) {
    sortBy = "price";
  }
  if (!sortOrder) {
    sortOrder = -1;
  }
  if (searchTerm) {
    // queryFilter.name = searchTerm;
    queryFilter.$or = [
      { name: { $regex: ".*" + searchTerm + ".*" } },
      { shortDescription: { $regex: ".*" + searchTerm + ".*" } },
    ];
  }
  if (categoryId) {
    queryFilter.categoryId = categoryId;
  }
  if (brandId) {
    queryFilter.brandId = brandId;
  }
  console.log("queryFilter", queryFilter);
  const products = await Product.find(queryFilter)
    .sort({
      [sortBy]: +sortOrder,
    })
    .skip((+page - 1) * +pageSize)
    .limit(+pageSize);
  return products.map((x) => x.toObject());
}
module.exports = {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getFeaturedProducts,
  getNewProducts,
  getProductForListing,
};
