const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/connect");
const JWT_SECRET = "jivanaryal";

// Admin Signup
const signupAdmin = async (req, res) => {
  const { email, password } = req.body;

  // Validate required fields
  const requiredFields = ["email", "password"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  try {
    // Check if the admin already exists
    const [existingAdmin] = await pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (existingAdmin.length > 0) {
      return res.status(400).json({ error: "Admin with this email already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin into the database
    const [newAdmin] = await pool.query(
      "INSERT INTO admin (email, password) VALUES (?, ?)",
      [email, hashedPassword]
    );

    res.status(201).json({ message: "Admin signed up successfully" });
  } catch (error) {
    console.error("Error signing up admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Admin Login
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if the admin exists
    const [results] = await pool.query(
      "SELECT * FROM admin WHERE email = ?",
      [email]
    );

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const admin = results[0];

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ admin_id: admin.admin_id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, admin_id: admin.admin_id });
  } catch (error) {
    console.error("Error logging in admin:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  signupAdmin,
  loginAdmin,
};
