const express = require("express");
const router = express.Router();
const uploadMultiple = require("../middleware/multer");
const productController = require("../controllers/products");

// Routes for handling products
router.post("/", uploadMultiple, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.put("/:id", uploadMultiple, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;