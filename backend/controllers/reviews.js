const Review = require("../models/reviews");
const pool = require("../database/connect");

const postReview = async (req, res) => {
  const { product_id, CustomerID, rating, comment } = req.body;
  const reviewModel = new Review(product_id, CustomerID, rating, comment);

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

const checkRatingAuth = async(req,res)=>{
  const {id} = req.params;

  const product_id = id;

  try { 
     
      const connection =await pool.getConnection();


      const [order] = await connection.execute(
        "SELECT * FROM order_items WHERE order_status = ? AND product_id = ?",
        ['complete', product_id]
      );
      
      connection.release();

        if(order.length === 0){
          return res.send(false);
        }else{
          return res.send(true);
        }   
  } catch (error) {
   res.status(400).json({error:"internal server error",error:error.message})
  }
    













   
}

const getAllReviews = async (req, res) => {
  console.log("hello are you called");
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
