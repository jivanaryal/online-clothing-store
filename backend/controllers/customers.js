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
    const [newCustomer] = await pool.query(
      "INSERT INTO customers (FirstName, LastName, Email, Password, PhoneNumber) VALUES (?, ?, ?, ?, ?)",
      [FirstName, LastName, Email, hashedPassword, PhoneNumber]
    );

    const customerId = newCustomer.insertId;

    // Create a cart for the new customer
    await pool.query(
      "INSERT INTO cart (customer_id) VALUES (?)",
      [customerId]
    );

    res.status(201).json({ message: "Customer signed up and cart created successfully" });
  } catch (error) {
    console.error("Error signing up customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const loginCustomers = async (req, res) => {
  const { Email, Password } = req.body;
  // console.log(Email, Password);

  if (!Email || !Password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  try {
    // Check if the customer exists
    const [results] = await pool.query(
      "SELECT * FROM customers WHERE Email = ? ",
      [Email]
    );

    // console.log([results]);

    if (results.length === 0) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    const customer = results[0];

    // Compare the password with the hashed password
    const isMatch = await bcrypt.compare(Password, customer.Password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid Email or Password" });
    }

    // Check if the customer already has a cart
    const [existingCart] = await pool.query(
      "SELECT * FROM cart WHERE customer_id = ?",
      [customer.CustomerID]
    );

    if (existingCart.length === 0) {
      // Create a cart if it doesn't exist
      await pool.query(
        "INSERT INTO cart (customer_id) VALUES (?)",
        [customer.CustomerID]
      );
    }

    // Generate JWT token
    const token = jwt.sign({ CustomerID: customer.CustomerID }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token, CustomerID: customer.CustomerID });
  } catch (error) {
    console.error("Error logging in customer:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const verifyToken = async (req, res) => {
  const { token } = req.body;

  const name = token;
  // console.log(name);

  try {
    jwt.verify(token, JWT_SECRET);
    res.status(200).json({ isValid: true });
  } catch (err) {
    res.status(401).json({ isValid: false });
  }
};


const CustomerInfo = async (req, res) => {

  try {
    const { customerID } = req.params;
     
  const [results] = await pool.query('SELECT FirstName, LastName from customers where CustomerID = ?', [customerID]);

  if (results.length === 0) {
    return res.status(404).json({ message: "no user available" });
      }
  
  return res.status(200).json(results);
  } catch (error) {
     res.status(500).json({ error: "Internal server error" });
  }

}















const ShowRecommendation = async (req, res) => {
    const customerID = req.params.customerID;
    console.log("Customer ID:", customerID); // Log the incoming customer ID

    try {
        // Step 1: Fetch all reviews from the database
        const [results] = await pool.query('SELECT CustomerID, product_id, rating FROM reviews');
        console.log("Fetched Results:", results); // Log fetched results

        // Step 2: Transform results into a preference matrix
        const prefs = {};
        results.forEach(({ CustomerID, product_id, rating }) => {
            if (!prefs[CustomerID]) prefs[CustomerID] = {};
            prefs[CustomerID][product_id] = parseFloat(rating); // Convert rating to a number
        });
        
        console.log("Preference Matrix:", prefs); // Log the preference matrix

        // Step 3: Perform collaborative filtering algorithm
        const recommendations = getRecommendations(prefs, customerID);
        console.log("Recommendations:", recommendations); // Log the recommendations before sending
        res.json(recommendations);
    } catch (err) {
        console.error("Error fetching recommendations:", err);
        res.status(500).send(err);
    }
};

// Function to calculate recommendations using collaborative filtering
function getRecommendations(prefs, customerID) {
    const totals = {};
    const simSums = {};

    // Get the ratings of the customer
    const customerRatings = prefs[customerID];
    console.log("Customer Ratings:", customerRatings); // Log customer ratings
    if (!customerRatings) return []; // No ratings found for the customer

    for (const other in prefs) {
        if (other === customerID) continue; // Skip the customer themselves

        const sim = pearsonCorrelation(prefs, customerID, other); // Use the Pearson correlation function
        console.log(`Similarity between ${customerID} and ${other}:`, sim); // Log similarity
        if (sim <= 0) continue; // Skip if similarity is not positive

        for (const item in prefs[other]) {
            // Only recommend items not already rated by the customer
            if (!(item in customerRatings)) {
                if (!totals[item]) totals[item] = 0;
                totals[item] += prefs[other][item] * sim; // Weighted score

                if (!simSums[item]) simSums[item] = 0;
                simSums[item] += sim; // Total similarity
            }
        }
    }

    console.log("Total Scores:", totals); // Log total scores for all items
    console.log("Similarity Sums:", simSums); // Log similarity sums

    // Calculate rankings
    const rankings = [];
    for (const item in totals) {
        rankings.push({ item, score: totals[item] / simSums[item] });
    }

    // Sort rankings by score
    rankings.sort((a, b) => b.score - a.score);
    console.log("Rankings:", rankings); // Log rankings before returning
    return rankings;
}

function pearsonCorrelation(prefs, person1, person2) {
    const si = [];
    for (const item in prefs[person1]) {
        if (item in prefs[person2]) si.push(item);
    }

    const n = si.length;
    console.log(`Common items between ${person1} and ${person2}:`, si);

    if (n === 0) return 0;

    const sum1 = si.reduce((sum, item) => sum + prefs[person1][item], 0);
    const sum2 = si.reduce((sum, item) => sum + prefs[person2][item], 0);
    const sum1Sq = si.reduce((sum, item) => sum + Math.pow(prefs[person1][item], 2), 0);
    const sum2Sq = si.reduce((sum, item) => sum + Math.pow(prefs[person2][item], 2), 0);
    const pSum = si.reduce((sum, item) => sum + (prefs[person1][item] * prefs[person2][item]), 0);

    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) * (sum2Sq - Math.pow(sum2, 2) / n));
    console.log(`Numerator: ${num}, Denominator: ${den}`);

    // Handle identical ratings
    if (den === 0) {
        if (num === 0) return 1; // Perfect correlation if both ratings are identical
        return 0; // No correlation
    }

    return num / den;
}


module.exports = {
  signupCustomers,
  loginCustomers,
  verifyToken,
  ShowRecommendation,
  CustomerInfo
};
