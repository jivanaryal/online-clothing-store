const db = require("../database/connect");

class CartItem {
  constructor(cart_id, product_id, quantity) {
    this.cart_id = cart_id;
    this.product_id = product_id;
    this.quantity = quantity;
  }

  async add() {
    const addSql =
      "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)";
    return db.execute(addSql, [this.cart_id, this.product_id, this.quantity]);
  }

  static async getItemsByCartId(cart_id) {
    const getByCartIdSql = "SELECT * FROM cart_items WHERE cart_id = ?";
     return db.execute(getByCartIdSql, [cart_id]);
     
  }

  static async updateItemQuantity(id, quantity) {
    console.log(id,quantity)
    const updateSql = "UPDATE cart_items SET quantity = ? WHERE id = ?";
    return db.execute(updateSql, [quantity, id]);
  }

  static async deleteItem(id) {
    const deleteSql = "DELETE FROM cart_items WHERE id = ?";
    return db.execute(deleteSql, [id]);
  }
}

module.exports = CartItem;
