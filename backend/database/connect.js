const mysql = require("mysql2");

require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "adminjivan",
  database: "online-clothing-store",
  connectionLimit: 10,
  port: 3306,
});

pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("you are connected to the online-clothing-store");
});

module.exports = pool.promise();
