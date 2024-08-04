const Router = require("express");

const {
  signupCustomers,
  loginCustomers,
  verifyToken,
} = require("../controllers/customers");

const router = Router();

router.route("/signup").post(signupCustomers);
router.route("/login").post(loginCustomers);
router.route("/verify-token").post(verifyToken);

module.exports = router;
