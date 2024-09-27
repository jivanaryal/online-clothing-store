const express = require("express");
const router = express.Router();
const uploadMultiple = require("../middleware/multer");
const productController = require("../controllers/products");

// Routes for handling products
router.post("/", uploadMultiple, productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/catsub", productController.catSubCatPro);
router.get("/all", productController.getAllProductsWithReviewsAndDiscounts);
router.get("/similar/:id", productController.getProductsBySubcategoryId);
router.get("/:id", productController.getProductById);
router.patch("/:id", uploadMultiple, productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;
