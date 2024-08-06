const express = require("express");
const router = express.Router();
const subcategoryController = require("../controllers/subcategories");

router.post("/", subcategoryController.postSubcategoryData);
router.get("/", subcategoryController.getAllSubcategories);
router.get("/:id", subcategoryController.getSubcategoryById);
router.delete("/:id", subcategoryController.deleteSubcategoryData);
router.put("/:id", subcategoryController.updateSubcategoryData);

module.exports = router;
