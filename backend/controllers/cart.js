const Cart = require("../models/cart");
const CartItem = require("../models/cart_items");

const createCart = async (req, res) => {
  const { customer_id } = req.body;
  const cart = new Cart(customer_id);

  try {
    const [createdCart] = await cart.create();
    return res.status(201).json({
      createdCart,
      msg: "Cart created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};


const getAllCartByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  console.log(customerId,"hello")

  try {
    const [cart] = await Cart.getCartByCustomerId(customerId);
    console.log(cart)
 
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};



const getCartByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  console.log(customerId,"hello")

  try {
    const [cart] = await Cart.getCartByCustomerIds(customerId);
    console.log(cart)
 
    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};


const deleteCart = async (req, res) => {
  const { cartId } = req.params;

  try {
    await Cart.deleteCart(cartId);
    return res.status(200).json({ msg: "Cart deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const addItemToCart = async (req, res) => {
  const { cart_id, product_id, quantity } = req.body;
 
  const cartItem = new CartItem(cart_id, product_id, quantity);

  try {
    const [addedItem] = await cartItem.add();
    return res.status(201).json({
      addedItem,
      msg: "Item added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getItemsByCartId = async (req, res) => {
  const { cartId } = req.params;
  console.log(cartId)

  try {
    const [items] = await CartItem.getItemsByCartId(cartId);
    return res.status(200).json(items);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { id, quantity } = req.body;

  try {
    await CartItem.updateItemQuantity(id, quantity);
    return res.status(200).json({ msg: "Item quantity updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteCartItem = async (req, res) => {
  const { id } = req.params;
  console.log(id)

  try {
    await CartItem.deleteItem(id);
    return res.status(200).json({ msg: "Item deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  createCart,
  getCartByCustomerId,
  deleteCart,
  addItemToCart,
  getItemsByCartId,
  updateCartItemQuantity,
  deleteCartItem,
  getAllCartByCustomerId,
};
