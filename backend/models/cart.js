const db = require("../database/connect");

class Cart {
  constructor(customer_id) {
    this.customer_id = customer_id;
  }

  async create() {
    const createSql = "INSERT INTO Cart (customer_id) VALUES (?)";
    return db.execute(createSql, [this.customer_id]);
  }

  static async getCartByCustomerIds(customer_id) {
    const sql = `
      SELECT cart_id FROM cart WHERE customer_id = ?
    `;
    return db.execute(sql, [customer_id]);
  }
  static async deleteCart(cart_id) {
    const deleteCartSql = "DELETE FROM Cart WHERE cart_id = ?";
    return db.execute(deleteCartSql, [cart_id]);
  }


  static async getCartByCustomerId(customer_id) {
    const getByCustomerIdSql = `
   SELECT 
  ci.cart_id,
  ci.id,
  ci.product_id,
  ci.quantity,
  p.name AS product_name,
  p.price AS product_price,
  p.description AS product_description,
  p.imageURL AS product_imageURL,
  p.brand AS product_brand,
  p.size AS product_size,
  p.color AS product_color,
  p.subcategory_id AS product_subcategory_id,
  p.stockQuantity AS product_stockQuantity
FROM cart_items ci
INNER JOIN products p ON ci.product_id = p.product_id
INNER JOIN Cart c ON ci.cart_id = c.cart_id
WHERE c.customer_id = ?
    `;
    return db.execute(getByCustomerIdSql, [customer_id]);
  }



}

module.exports = Cart;
