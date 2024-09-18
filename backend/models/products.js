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
    const selectSql = `
    SELECT p.*, 
       d.discount_percentage,
       AVG(r.rating) AS avgRating,
       COUNT(r.rating) AS review_count
FROM products p
LEFT JOIN discounts d ON p.product_id = d.product_id
LEFT JOIN reviews r ON p.product_id = r.product_id
WHERE p.product_id = ?
GROUP BY p.product_id, d.discount_percentage;

    `;
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
    // console.log(values, "console loggine value");
    return db.execute(updateSql, values);
  }

  static async delete(product_id) {
    const deleteSql = "DELETE FROM products WHERE product_id = ?";
    const values = [product_id];
    return db.execute(deleteSql, values);
  }

  static async findWithReviewsAndDiscounts() {
    const selectSql = `
      SELECT 
  p.*,
  COALESCE(r.rating, NULL) AS review_rating,
  COALESCE(r.comment, NULL) AS review_comment,
  COALESCE(d.discount_percentage, NULL) AS discount_percentage,
  COALESCE(d.start_date, NULL) AS discount_start_date,
  COALESCE(d.end_date, NULL) AS discount_end_date
FROM 
  products p
LEFT JOIN 
  reviews r ON p.product_id = r.product_id
LEFT JOIN 
  discounts d ON p.product_id = d.product_id
    `;
  
    return db.execute(selectSql);
  }
  static async findAllCatSubCat() {
    const selectSql = `
      SELECT 
        c.category_id AS category_id,
        c.name AS category_name,
        s.subcategory_id AS subcategory_id,
        s.name AS subcategory_name,
        p.product_id AS product_id,
        p.name AS product_name
      FROM categories c
      LEFT JOIN subcategories s ON c.category_id = s.category_id
      LEFT JOIN products p ON s.subcategory_id = p.subcategory_id
      ORDER BY c.category_id, s.subcategory_id, p.product_id;
    `;
  
    return db.execute(selectSql);
  }
  
}

module.exports = Product;
