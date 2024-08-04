const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../database/connect");
const JWT_SECRET = "jivanaryal";

const signupCustomers = async (req, res) => {
  const { FirstName, LastName, Email, Password, PhoneNumber } = req.body;

  const requiredFields = [
    "FirstName",
    "LastName",
    "Email",
    "Password",
    "PhoneNumber",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ error: `Missing fields: ${missingFields.join(", ")}` });
  }

  try {
    // Check if a customer with the given email already exists
    const [existingCustomer] = await pool.query(
      "SELECT * FROM customers WHERE Email = ?",
      [Email]
    );

    if (existingCustomer.length > 0) {
      return res
        .status(400)
        .json({ error: "Customer with this email already exists" });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(Password, 10);

    // Insert the new customer into the database
    await pool.query(
      "INSERT INTO customers (FirstName, LastName, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?, ?)",
      [FirstName, LastName, Email, hashedPassword, PhoneNumber]
    );

    res.status(201).json({ message: "Customer signed up successfully" });
  } catch (error) {
    console.error("Error signing up customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginCustomers = async (req, res) => {
  const { Email, Password } = req.body;

  if (!Email || !Password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if the customer exists
    const [results] = await pool.query(
      "SELECT * FROM customers WHERE Email = ?",
      [Email]
    );

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const customer = results[0];

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(Password, customer.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Generate JWT token
    const token = jwt.sign({ CustomerID: customer.CustomerID }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.body;

  try {
    jwt.verify(token, JWT_SECRET);
    res.status(200).json({ isValid: true });
  } catch (err) {
    res.status(401).json({ isValid: false });
  }
};

module.exports = {
  signupCustomers,
  loginCustomers,
  verifyToken,
};
