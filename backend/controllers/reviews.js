const Review = require("../models/reviews");
const pool = require("../database/connect");

const postReview = async (req, res) => {
  // console.log(req.body)
  const { product_id, customer_id, rating, comment } = req.body;
  const reviewModel = new Review(product_id, customer_id, rating, comment);

  try {
    const createRecord = await reviewModel.create();
    return res.status(201).json({
      createRecord,
      msg: "Review added successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const checkRatingAuth = async (req, res) => {
  const { product_id, ConsumerID } = req.query;
  // console.log(product_id, ConsumerID);

  try {
    const connection = await pool.getConnection();

    // Step 1: Find all orders by this customer
    const [orders] = await connection.execute(
      "SELECT order_id FROM orders WHERE customer_id = ?", 
      [ConsumerID]
    );

    // console.log("Orders:", orders);

    if (orders.length === 0) {
      // If no orders are found, return false
      connection.release();
      return res.send(false);
    }

    // Step 2: Check if the product was ordered in those orders and the order is complete
    const orderIds = orders.map(order => order.order_id); // Extract order_ids
    // console.log("Order IDs:", orderIds);

    // Use query instead of execute to handle multiple order IDs properly
    const [orderItems] = await connection.query(
      `SELECT * FROM order_items 
       WHERE order_status = ? 
       AND product_id = ? 
       AND order_id IN (?)`, 
      ['complete', product_id, orderIds]
    );

    // console.log("Order Items:", orderItems);

    connection.release();

    // Step 3: If no order items are found, return false
    if (orderItems.length === 0) {
      return res.send(false);
    } else {
      return res.send(true);
    }
  } catch (error) {
    console.log("Error occurred:", error);
    return res.status(400).json({ error: "Internal server error", details: error.message });
  }
};


const getAllReviews = async (req, res) => {
  // console.log("hello are you called");
  try {
    const [reviews] = await Review.getAll();
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getReviewsByProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    const [reviews] = await Review.getByProductId(productId);
    return res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  try {
    await Review.deleteById(reviewId);
    return res.status(200).json({ msg: "Review deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  postReview,
  getAllReviews,
  getReviewsByProduct,
  deleteReview,
  checkRatingAuth,
};
