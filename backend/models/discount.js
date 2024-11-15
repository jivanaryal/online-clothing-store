const db = require("../database/connect");

class Discount {
  constructor(
    product_id,
    discount_percentage,
    start_date,
    end_date,
    description
  ) {
    this.product_id = product_id;
    this.discount_percentage = discount_percentage;
    this.start_date = start_date;
    this.end_date = end_date;
    this.description = description;
  }

  async create() {
    const createSql =
      "INSERT INTO discounts (product_id, discount_percentage, start_date, end_date, description) VALUES (?, ?, ?, ?, ?)";
    const values = [
      this.product_id,
      this.discount_percentage,
      this.start_date,
      this.end_date,
      this.description,
    ];
    return db.execute(createSql, values);
  }

   async updateDis(discount_id){
    const updateSQL = "Update discounts set discount_percentage = ?, start_date = ?, end_date = ?, description = ? where discount_id = ?";
    const values = [
      this.discount_percentage,
      this.start_date,
      this.end_date,
      this.description,
      discount_id
    ]
    return db.execute(updateSQL,values);
  }

  static async getAll() {
    const getAllSql = "SELECT * FROM discounts";
    return db.execute(getAllSql);
  }

  static async getByProductId(product_id) {
    const getByProductIdSql = "SELECT discount_id, product_id, discount_percentage,DATE_FORMAT(start_date, '%Y-%m-%d') AS start_date,DATE_FORMAT(end_date,'%Y-%m-%d') AS end_date,description  FROM discounts WHERE product_id = ?";
    return db.execute(getByProductIdSql, [product_id]);
  }

  static async deleteById(discount_id) {
    const deleteByIdSql = "DELETE FROM discounts WHERE discount_id = ?";
    return db.execute(deleteByIdSql, [discount_id]);
  }
}

module.exports = Discount;
