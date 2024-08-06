const Category = require("../models/categories");

const postCategoryData = async (req, res) => {
  try {
    const { name, description } = req.body;
    const categoryModel = new Category(name, description);

    if (await categoryModel.exists()) {
      return res.status(409).json({
        error: "Conflict",
        msg: "Category with the same name already exists.",
      });
    }

    const createRecord = await categoryModel.create();
    return res.status(200).json({
      createRecord,
      msg: "Category created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (category.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No category found with the specified ID.",
      });
    }

    return res.status(200).json(category[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const deleteCategoryData = async (req, res) => {
  try {
    const { id } = req.params;
    const categoryModel = new Category();
    const deleteRecord = await categoryModel.deleteCategory(id);

    if (!deleteRecord) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No category found with the specified ID.",
      });
    }

    return res.status(200).json({
      deleteRecord,
      msg: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const updateCategoryData = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, description } = req.body;
    const categoryModel = new Category(name, description);

    try {
      const updateRecord = await categoryModel.updateCategory(id);
      return res.status(200).json({
        updateRecord,
        msg: "Category updated successfully",
      });
    } catch (error) {
      if (error.message === "No category found with the specified ID.") {
        return res.status(404).json({
          error: "Not Found",
          msg: "No category found with the specified ID.",
        });
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

module.exports = {
  postCategoryData,
  getAllCategories,
  getCategoryById,
  deleteCategoryData,
  updateCategoryData,
};
