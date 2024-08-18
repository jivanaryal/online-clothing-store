const db = require("../database/connect");

class Product {
  constructor(
    name,
    category_id,
    price,
    description,
    imageURLs,
    brand,
    size,
    color,
    subcategory_id,

    stockQuantity
  ) {
    this.name = name;
    this.category_id = category_id;
    this.price = price;
    this.description = description;
    this.imageURLs = imageURLs;
    this.brand = brand;
    this.size = size;
    this.color = color;
    this.subcategory_id = subcategory_id;

    this.stockQuantity = stockQuantity;
  }

  async create() {
    const createSql = `
      INSERT INTO products (name, category_id, price, description, imageURL, brand, size, color,subcategory_id,stockQuantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?)`;
    const values = [
      this.name,
      this.category_id,
      this.price,
      this.description,
      JSON.stringify(this.imageURLs),
      this.brand,
      this.size,
      this.color,
      this.subcategory_id,

      this.stockQuantity,
    ];

    return db.execute(createSql, values);
  }

  static async findAll() {
    const selectSql = "SELECT * FROM products";
    return db.execute(selectSql);
  }

  static async findById(product_id) {
    const selectSql = "SELECT * FROM products WHERE product_id = ?";
    const values = [product_id];
    return db.execute(selectSql, values);
  }

  static async update(product_id, data) {
    const {
      name,
      category_id,
      price,
      description,
      imageURLs,
      brand,
      size,
      color,
      subcategory_id,

      stockQuantity,
    } = data;
    console.log(imageURLs, "from models");
    const updateSql = `
      UPDATE products
      SET name = ?, category_id = ?, price = ?, description = ?, imageURL = ?, brand = ?, size = ?, color = ?, subcategory_id = ?,stockQuantity =?
      WHERE product_id = ?`;
    const values = [
      name,
      category_id,
      price,
      description,
      JSON.stringify(imageURLs),
      brand,
      size,
      color,
      subcategory_id,

      stockQuantity,
      product_id,
    ];
    console.log(values, "console loggine value");
    return db.execute(updateSql, values);
  }

  static async delete(product_id) {
    const deleteSql = "DELETE FROM products WHERE product_id = ?";
    const values = [product_id];
    return db.execute(deleteSql, values);
  }
}

module.exports = Product;
