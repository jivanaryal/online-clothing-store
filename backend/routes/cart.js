const Router = require("express");
const {
  createCart,
  getCartByCustomerId,
  deleteCart,
  addItemToCart,
  getItemsByCartId,
  updateCartItemQuantity,
  deleteCartItem,
  getAllCartByCustomerId,
} = require("../controllers/cart");

const router = Router();

// Route for creating a cart
router.route("/").post(createCart);

// Route for getting a cart by customer ID
router.route("/customer/:customerId").get(getCartByCustomerId);
router.route("/all/:customerId").get(getAllCartByCustomerId);

// Route for deleting a cart
router.route("/:cartId").delete(deleteCart);

// Route for adding an item to a cart
router.route("/items").post(addItemToCart);

// Route for getting items by cart ID
router.route("/items/:cartId").get(getItemsByCartId);

// Route for updating an item quantity
router.route("/items").patch(updateCartItemQuantity);

// Route for deleting an item from a cart
router.route("/items/:id").delete(deleteCartItem);

module.exports = router;
