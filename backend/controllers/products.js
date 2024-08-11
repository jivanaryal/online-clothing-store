const Product = require("../models/products");
const path = require("path");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      category_id,
      price,
      description,
      brand,
      size,
      color,
      subcategory_id,
      discount,
      stockQuantity,
    } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please provide the images" });
    }

    const imageURLs = req.files.map((file) => `/uploads/${file.filename}`);

    const productModel = new Product(
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
    );

    console.log(imageURLs);
    const createRecord = await productModel.create();
    return res.status(201).json({
      createRecord,
      msg: "Product created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (product[0].length === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No product found with the specified ID.",
      });
    }

    return res.status(200).json(product[0][0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category_id,
      price,
      description,
      brand,
      size,
      color,
      subcategory_id,
      discount,
      stockQuantity,
    } = req.body;

    let imageURLs;
    if (req.files && req.files.length > 0) {
      console.log(req.files);
      imageURLs = req.files.map((file) => `/uploads/${file.filename}`);
    } else {
      // Fetch existing imageURLs if no new images are provided
      const existingProduct = await Product.findById(id);
      if (existingProduct[0].length === 0) {
        return res.status(404).json({
          error: "Not Found",
          msg: "No product found with the specified ID.",
        });
      }
      imageURLs = existingProduct[0][0].imageURL; // Assuming the imageURLs field exists in the database
    }

    const updateData = {
      name,
      category_id,
      price,
      description,
      imageURLs, // This should be an array
      brand,
      size,
      color,
      subcategory_id,
      discount,
      stockQuantity,
    };

    const updatedProduct = await Product.update(id, updateData);

    if (updatedProduct[0].affectedRows === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No product found with the specified ID.",
      });
    }

    return res.status(200).json({
      updatedProduct,
      msg: "Product updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.delete(id);

    if (deletedProduct[0].affectedRows === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No product found with the specified ID.",
      });
    }

    return res.status(200).json({
      deletedProduct,
      msg: "Product deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
