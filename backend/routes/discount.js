const Router = require("express");
const {
  postDiscount,
  getAllDiscounts,
  getDiscountsByProduct,
  deleteDiscount,
} = require("../controllers/discount");

const router = Router();

// Route for getting all discounts
router.route("/").get(getAllDiscounts);

// Route for posting a discount
router.route("/").post(postDiscount);

// Route for getting discounts for a specific product
router.route("/products/:productId").get(getDiscountsByProduct);

// Route for deleting a discount
router.route("/:discountId").delete(deleteDiscount);

module.exports = router;
