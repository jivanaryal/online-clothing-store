const db = require("../database/connect");

class Review {
  constructor(product_id, CustomerID, rating, comment) {
    this.product_id = product_id;
    this.CustomerID = CustomerID;
    this.rating = rating;
    this.comment = comment;
  }

  async create() {
    const createSql =
      "INSERT INTO reviews(product_id, CustomerID, rating, comment) VALUES(?, ?, ?, ?)";
    const values = [
      this.product_id,
      this.CustomerID,
      this.rating,
      this.comment,
    ];
    return db.execute(createSql, values);
  }

  static async getAll() {
    const getAllSql = "SELECT * FROM reviews";
    return db.execute(getAllSql);
  }

  static async getByProductId(product_id) {
    const getByProductIdSql = "SELECT * FROM reviews WHERE product_id = ?";
    return db.execute(getByProductIdSql, [product_id]);
  }

  static async deleteById(reviewId) {
    const deleteByIdSql = "DELETE FROM reviews WHERE review_id = ?";
    return db.execute(deleteByIdSql, [reviewId]);
  }
}

module.exports = Review;
