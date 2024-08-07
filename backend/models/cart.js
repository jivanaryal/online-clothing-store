const db = require("../database/connect");

class Cart {
  constructor(customer_id) {
    this.customer_id = customer_id;
  }

  async create() {
    const createSql = "INSERT INTO Cart (customer_id) VALUES (?)";
    return db.execute(createSql, [this.customer_id]);
  }

  static async getCartByCustomerId(customer_id) {
    const getByCustomerIdSql = "SELECT * FROM Cart WHERE customer_id = ?";
    return db.execute(getByCustomerIdSql, [customer_id]);
  }

  static async deleteCart(cart_id) {
    const deleteCartSql = "DELETE FROM Cart WHERE cart_id = ?";
    return db.execute(deleteCartSql, [cart_id]);
  }
}

module.exports = Cart;
