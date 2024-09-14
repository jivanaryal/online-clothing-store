const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategories");

router.post("/", subcategoryController.postSubcategoryData);
router.get("/", subcategoryController.getAllSubcategories);
router.get("/all", subcategoryController.getAllCategoryandSubCategory);
router.get("/:id", subcategoryController.getSubcategoryById);
router.delete("/:id", subcategoryController.deleteSubcategoryData);
router.get("/new/:id", subcategoryController.getSubcategoryProducts);
router.patch("/:id", subcategoryController.updateSubcategoryData);

module.exports = router;
