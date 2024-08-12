const db = require("../database/connect");

class Category {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }

  async exists() {
    const query = "SELECT COUNT(*) as count FROM categories WHERE name = ?";
    const [rows] = await db.execute(query, [this.name]);
    return rows[0].count > 0;
  }

  async create() {
    if (await this.exists()) {
      throw new Error("Category with the same name already exists.");
    }

    const createSql = "INSERT INTO categories (name,description) VALUES (?,?)";
    const values = [this.name, this.description];
    return db.execute(createSql, values);
  }

  async updateCategory(id) {
    const updateSql =
      "UPDATE categories SET name = ?, description = ? WHERE category_id = ?";
    const values = [this.name, this.description, id];
    return db.execute(updateSql, values);
  }

  static async findAll() {
    const selectSql = "SELECT * FROM categories";
    return db.execute(selectSql);
  }

  static async findById(id) {
    const selectSql = "SELECT * FROM categories WHERE category_id = ?";
    return db.execute(selectSql, [id]);
  }

  async deleteCategory(id) {
    const deleteSql = "DELETE FROM categories WHERE category_id = ?";
    return db.execute(deleteSql, [id]);
  }
}

module.exports = Category;
