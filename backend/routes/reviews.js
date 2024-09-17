const Router = require("express");
const {
  postReview,
  getAllReviews,
  getReviewsByProduct,
  deleteReview,
  checkRatingAuth,
} = require("../controllers/reviews");

const router = Router();

// Route for getting all reviews
router.route("/").get(getAllReviews);
router.route("/auth/:id").get(checkRatingAuth)

// Route for posting a review and getting reviews for a specific product
router
  .route("/products/:productId/reviews")
  .post(postReview)
  .get(getReviewsByProduct);

// Route for deleting a review
router.route("/:reviewId").delete(deleteReview);

module.exports = router;
