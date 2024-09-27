const Router = require("express");

const {
  signupCustomers,
  loginCustomers,
  verifyToken,
  ShowRecommendation,
} = require("../controllers/customers");

const router = Router();

router.route("/signup").post(signupCustomers);
router.route("/login").post(loginCustomers);
router.route("/verify-token").post(verifyToken);
router.route("/recommendations/:customerID").get(ShowRecommendation)

module.exports = router;
