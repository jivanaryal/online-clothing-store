const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categories");

router.post("/", categoryController.postCategoryData);
router.get("/", categoryController.getAllCategories);
router.get("/:id", categoryController.getCategoryById);
router.delete("/:id", categoryController.deleteCategoryData);
router.patch("/:id", categoryController.updateCategoryData);

module.exports = router;
