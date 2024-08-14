const db = require("../database/connect");

class Subcategory {
  constructor(name, description, category_id) {
    this.name = name;
    this.category_id = category_id;
    this.description = description;
  }

  async exists() {
    const query =
      "SELECT COUNT(*) as count FROM subcategories WHERE name = ? & description = ? AND category_id = ?";
    const [rows] = await db.execute(query, [
      this.name,
      this.description,
      this.category_id,
    ]);
    return rows[0].count > 0;
  }

  async create() {
    if (await this.exists()) {
      throw new Error(
        "Subcategory with the same name already exists in this category."
      );
    }

    const createSql =
      "INSERT INTO subcategories (name,category_id, description) VALUES (?, ?,?)";
    const values = [this.name, this.description, this.category_id];
    console.log(this.name, this.category_id, this.description);
    return db.execute(createSql, values);
  }

  async updateSubcategory(id) {
    const updateSql =
      "UPDATE subcategories SET name = ?, category_id = ?, description = ? WHERE subcategory_id = ?";
    const values = [this.name, this.category_id, this.description, id];
    return db.execute(updateSql, values);
  }

  static async findAll() {
    const selectSql = "SELECT * FROM subcategories";
    const [rows] = await db.execute(selectSql); // Destructure to get only the rows
    return rows; // Return just the rows
  }

  static async findAllCategoryandSubCategory() {
    const selectAllSql =
      "SELECT subcategories.name AS subcategory_name, subcategories.description AS subcategory_description, subcategories.subcategory_id, categories.name AS category_name, categories.category_id FROM subcategories INNER JOIN categories ON subcategories.category_id = categories.category_id";

    const [rows] = await db.execute(selectAllSql);
    return rows;
  }

  static async findById(id) {
    const selectSql = "SELECT * FROM subcategories WHERE subcategory_id = ?";
    return db.execute(selectSql, [id]);
  }

  async deleteSubcategory(id) {
    const deleteSql = "DELETE FROM subcategories WHERE subcategory_id = ?";
    return db.execute(deleteSql, [id]);
  }

  static async findByCategoryId(category_id) {
    const query = "SELECT * FROM subcategories WHERE category_id = ?";
    const [rows] = await db.execute(query, [category_id]);
    return rows;
  }
}

module.exports = Subcategory;
