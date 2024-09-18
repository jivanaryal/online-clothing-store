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
// console.log("routes")
router.route("/").get(getAllReviews);
console.log("routes")
router.route("/auth").get(checkRatingAuth)

// Route for posting a review and getting reviews for a specific product
router
  .route("/here")
  .post(postReview);

  router.route("/:productId").get(getReviewsByProduct);

// Route for deleting a review
router.route("/:reviewId").delete(deleteReview);

module.exports = router;
