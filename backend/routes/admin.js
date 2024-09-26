const Router = require("express");

const { signupAdmin, loginAdmin } = require("../controllers/admin");

const router = Router();

// Signup Route
router.route("/signup").post(signupAdmin);

// Login Route
router.route("/login").post(loginAdmin);

module.exports = router;
