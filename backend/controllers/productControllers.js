import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc get all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, resp) => {
  const product = await Product.find({});
  resp.json(product);
});

// @desc get Single Product
// @route /api/products/:id
// @access public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    return res.json(product);
  }
  res.status(404);
  throw new Error("Product not found");
});

export { getProducts, getProductById };
