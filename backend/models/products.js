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
    discount,
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
    this.discount = discount;
    this.stockQuantity = stockQuantity;
  }

  async create() {
    const createSql = `
      INSERT INTO products (name, category_id, price, description, imageURL, brand, size, color,subcategory_id,discount,stockQuantity)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?,?,?,?)`;
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
      this.discount,
      this.stockQuantity,
    ];

    console.log(values);
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
      discount,
      stockQuantity,
    } = data;
    const updateSql = `
      UPDATE products
      SET name = ?, category_id = ?, price = ?, description = ?, imageURL = ?, brand = ?, size = ?, color = ?, subcategory_id = ?, discount = ?,stockQuantity =?
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
      discount,
      product_id,
      stockQuantity,
    ];
    return db.execute(updateSql, values);
  }

  static async delete(product_id) {
    const deleteSql = "DELETE FROM products WHERE product_id = ?";
    const values = [product_id];
    return db.execute(deleteSql, values);
  }
}

module.exports = Product;