const Subcategory = require("../models/subcategories");

const postSubcategoryData = async (req, res) => {
  try {
    const { name, category_id, description } = req.body;
    
    const subcategoryModel = new Subcategory(name, category_id, description);

    if (await subcategoryModel.exists()) {
      return res.status(409).json({
        error: "Conflict",
        msg: "Subcategory with the same name already exists in this category.",
      });
    }

    const createRecord = await subcategoryModel.create();
    return res.status(200).json({
      createRecord,
      msg: "Subcategory created successfully",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getAllSubcategories = async (req, res) => {
  try {
    const { category_id } = req.query;
    
    let subcategories;

    if (category_id) {
      subcategories = await Subcategory.findByCategoryId(category_id);
      // console.log(subcategories);
    } else {
      subcategories = await Subcategory.findAll();
      console.log(subcategories);
    }

    return res.status(200).json(subcategories);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getAllCategoryandSubCategory = async (req, res) => {
  try {
    const subcategoryandcategory =
      await Subcategory.findAllCategoryandSubCategory();
    if (!subcategoryandcategory) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No subcategory found",
      });
    }

    return res.status(200).json(subcategoryandcategory);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const getSubcategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategory = await Subcategory.findById(id);

    if (subcategory.length === 0) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No subcategory found with the specified ID.",
      });
    }

    return res.status(200).json(subcategory[0]);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};



const deleteSubcategoryData = async (req, res) => {
  try {
    const { id } = req.params;
    const subcategoryModel = new Subcategory();
    const deleteRecord = await subcategoryModel.deleteSubcategory(id);

    if (!deleteRecord) {
      return res.status(404).json({
        error: "Not Found",
        msg: "No subcategory found with the specified ID.",
      });
    }

    return res.status(200).json({
      deleteRecord,
      msg: "Subcategory deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal Server Error",
      msg: error.message,
    });
  }
};

const updateSubcategoryData = async (req, res) => {
  const { id } = req.params;

  try {
    const { name, category_id, description } = req.body;
    const subcategoryModel = new Subcategory(name, category_id, description);

    try {
      const updateRecord = await subcategoryModel.updateSubcategory(id);
      return res.status(200).json({
        updateRecord,
        msg: "Subcategory updated successfully",
      });
    } catch (error) {
      if (error.message === "No subcategory found with the specified ID.") {
        return res.status(404).json({
          error: "Not Found",
          msg: "No subcategory found with the specified ID.",
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

const getSubcategoryProducts = async (req, res) => {

  const { id } = req.params;

 
  //  console.log(req.params)
  try {
    const products = await Subcategory.findProductsBySubcategoryId(id);
    if (products.length === 0) {
      return res.status(404).json({ message: 'No products found for this subcategory.' });
    }
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products.' });
  }
};

module.exports = {
  postSubcategoryData,
  getAllCategoryandSubCategory,
  getAllSubcategories,
  getSubcategoryById,
  deleteSubcategoryData,
  updateSubcategoryData,
  getSubcategoryProducts
};
