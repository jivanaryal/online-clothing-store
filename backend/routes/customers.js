const Router = require("express");

const {
  signupCustomers,
  loginCustomers,
  verifyToken,
  ShowRecommendation,
  CustomerInfo,
} = require("../controllers/customers");

const router = Router();

router.route("/signup").post(signupCustomers);
router.route("/login").post(loginCustomers);
router.route("/verify-token").post(verifyToken);
router.route("/recommendations/:customerID").get(ShowRecommendation)
router.route("/info/:customerID").get(CustomerInfo)

module.exports = router;
